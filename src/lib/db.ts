import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const connectionString = process.env.DATABASE_URL;
const DB_FILE = path.join(process.cwd(), 'local-db.json');

// Initialize Pool
const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  // Silent unexpected error on idle client
});

// JSON Fallback Helpers
const readJSON = () => {
  if (!fs.existsSync(DB_FILE)) return { users: [], workspaces: [], agents: [], calls: [], contacts: [] };
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { users: [], workspaces: [], agents: [], calls: [], contacts: [] };
  }
};

const writeJSON = (data: any) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

export const db = {
  user: {
    findUnique: async ({ where }: { where: { clerkId?: string; email?: string } }) => {
      try {
        const query = where.clerkId 
          ? 'SELECT * FROM "User" WHERE "clerkId" = $1' 
          : 'SELECT * FROM "User" WHERE "email" = $1';
        const val = where.clerkId || where.email;
        const res = await pool.query(query, [val]);
        if (res.rows[0]) {
          const workspaces = await pool.query('SELECT * FROM "Workspace" WHERE "ownerId" = $1', [res.rows[0].id]);
          return { ...res.rows[0], workspaces: workspaces.rows };
        }
        return null;
      } catch (error) {
        const data = readJSON();
        const user = data.users.find((u: any) => 
          (where.clerkId && u.clerkId === where.clerkId) || 
          (where.email && u.email === where.email)
        );
        if (user) {
          user.workspaces = data.workspaces.filter((w: any) => w.ownerId === user.id);
        }
        return user || null;
      }
    },
    create: async ({ data }: any) => {
      try {
        const id = `user_${Math.random().toString(36).substring(7)}`;
        const res = await pool.query(
          'INSERT INTO "User" (id, "clerkId", email, name, "updatedAt") VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
          [id, data.clerkId, data.email, data.name]
        );
        if (data.workspaces?.create) {
          const wsId = `ws_${Math.random().toString(36).substring(7)}`;
          await pool.query(
            'INSERT INTO "Workspace" (id, name, slug, "ownerId", "updatedAt") VALUES ($1, $2, $3, $4, NOW())',
            [wsId, data.workspaces.create.name, data.workspaces.create.slug, id]
          );
        }
        return res.rows[0];
      } catch (error) {
        const dbData = readJSON();
        const newUser = { id: `user_${Date.now()}`, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        dbData.users.push(newUser);
        if (data.workspaces?.create) {
          const newWS = { id: `ws_${Date.now()}`, ...data.workspaces.create, ownerId: newUser.id, createdAt: new Date().toISOString() };
          dbData.workspaces.push(newWS);
        }
        writeJSON(dbData);
        return newUser;
      }
    }
  },
  agent: {
    findMany: async ({ where, orderBy }: any) => {
      try {
        const res = await pool.query('SELECT * FROM "Agent" ORDER BY "createdAt" DESC');
        return res.rows;
      } catch (error) {
        const data = readJSON();
        return data.agents.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    },
    create: async ({ data }: any) => {
      try {
        const id = `agent_${Math.random().toString(36).substring(7)}`;
        const res = await pool.query(
          'INSERT INTO "Agent" (id, name, mode, "workspaceId", "systemPrompt", "voiceProvider", "voiceId", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
          [id, data.name, data.mode, data.workspaceId, data.systemPrompt, data.voiceProvider, data.voiceId]
        );
        return res.rows[0];
      } catch (error) {
        const dbData = readJSON();
        const newAgent = { id: `agent_${Date.now()}`, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        dbData.agents.push(newAgent);
        writeJSON(dbData);
        return newAgent;
      }
    },
    update: async ({ where, data }: any) => {
      try {
        const keys = Object.keys(data);
        const setClause = keys.map((key, i) => `"${key}" = $${i + 2}`).join(', ');
        const values = keys.map(key => {
          if (typeof data[key] === 'object' && data[key] !== null) {
            return JSON.stringify(data[key]);
          }
          return data[key];
        });
        const res = await pool.query(
          `UPDATE "Agent" SET ${setClause}, "updatedAt" = NOW() WHERE id = $1 RETURNING *`,
          [where.id, ...values]
        );
        return res.rows[0];
      } catch (error) {
        const dbData = readJSON();
        const agentIdx = dbData.agents.findIndex((a: any) => a.id === where.id);
        if (agentIdx !== -1) {
          dbData.agents[agentIdx] = { ...dbData.agents[agentIdx], ...data, updatedAt: new Date().toISOString() };
          writeJSON(dbData);
          return dbData.agents[agentIdx];
        }
        return null;
      }
    }
  },
  call: {
    findMany: async ({ where, include }: any) => {
      try {
        const res = await pool.query(`
          SELECT c.*, a.name as "agentName", co.name as "contactName", co.phone as "contactPhone"
          FROM "Call" c
          LEFT JOIN "Agent" a ON c."agentId" = a.id
          LEFT JOIN "Contact" co ON c."contactId" = co.id
          ORDER BY c."createdAt" DESC
        `);
        return res.rows.map(row => ({
          ...row,
          agent: { name: row.agentName },
          contact: row.contactId ? { name: row.contactName, phone: row.contactPhone } : null
        }));
      } catch (error) {
        const data = readJSON();
        return data.calls.map((c: any) => ({
          ...c,
          agent: data.agents.find((a: any) => a.id === c.agentId),
          contact: data.contacts.find((co: any) => co.id === c.contactId)
        })).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
  },
  workspace: {
    findMany: async ({ where, orderBy }: any) => {
      try {
        const query = 'SELECT * FROM "Workspace" ORDER BY "createdAt" DESC';
        const res = await pool.query(query);
        return res.rows;
      } catch (error) {
        const data = readJSON();
        return data.workspaces.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    },
    findUnique: async ({ where }: any) => {
      try {
        const query = where.id ? 'SELECT * FROM "Workspace" WHERE id = $1' : 'SELECT * FROM "Workspace" WHERE slug = $1';
        const val = where.id || where.slug;
        const res = await pool.query(query, [val]);
        return res.rows[0] || null;
      } catch (error) {
        const data = readJSON();
        return data.workspaces.find((w: any) => (where.id && w.id === where.id) || (where.slug && w.slug === where.slug)) || null;
      }
    },
    update: async ({ where, data }: any) => {
      try {
        const keys = Object.keys(data);
        const setClause = keys.map((key, i) => `"${key}" = $${i + 2}`).join(', ');
        const values = keys.map(key => data[key]);
        const res = await pool.query(
          `UPDATE "Workspace" SET ${setClause}, "updatedAt" = NOW() WHERE id = $1 RETURNING *`,
          [where.id, ...values]
        );
        return res.rows[0];
      } catch (error) {
        const dbData = readJSON();
        const wsIdx = dbData.workspaces.findIndex((w: any) => w.id === where.id);
        if (wsIdx !== -1) {
          dbData.workspaces[wsIdx] = { ...dbData.workspaces[wsIdx], ...data, updatedAt: new Date().toISOString() };
          writeJSON(dbData);
          return dbData.workspaces[wsIdx];
        }
        return null;
      }
    }
  },
  contact: {
    findMany: async ({ where }: any) => {
      try {
        const res = await pool.query('SELECT * FROM "Contact" ORDER BY "createdAt" DESC');
        return res.rows;
      } catch (error) {
        const data = readJSON();
        return data.contacts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    },
    update: async ({ where, data }: any) => {
      try {
        const keys = Object.keys(data);
        const setClause = keys.map((key, i) => `"${key}" = $${i + 2}`).join(', ');
        const values = keys.map(key => {
          if (typeof data[key] === 'object' && data[key] !== null) {
            return JSON.stringify(data[key]);
          }
          return data[key];
        });
        const res = await pool.query(
          `UPDATE "Contact" SET ${setClause}, "updatedAt" = NOW() WHERE id = $1 RETURNING *`,
          [where.id, ...values]
        );
        return res.rows[0];
      } catch (error) {
        console.warn("DB Fallback: contact.update failed, using JSON");
        const dbData = readJSON();
        const contactIdx = dbData.contacts.findIndex((c: any) => c.id === where.id);
        if (contactIdx !== -1) {
          dbData.contacts[contactIdx] = { 
            ...dbData.contacts[contactIdx], 
            ...data, 
            updatedAt: new Date().toISOString() 
          };
          writeJSON(dbData);
          return dbData.contacts[contactIdx];
        }
        return null;
      }
    },
    findUnique: async ({ where }: any) => {
      try {
        const query = where.id ? 'SELECT * FROM "Contact" WHERE id = $1' : 'SELECT * FROM "Contact" WHERE phone = $1';
        const val = where.id || where.phone;
        const res = await pool.query(query, [val]);
        return res.rows[0] || null;
      } catch (error) {
        const data = readJSON();
        return data.contacts.find((c: any) => (where.id && c.id === where.id) || (where.phone && c.phone === where.phone)) || null;
      }
    }
  }
};

export default db;
