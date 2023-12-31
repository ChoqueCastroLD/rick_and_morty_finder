import express, { Express, Request, Response } from 'express';
import cors from "cors";
import { getCharacters } from "./services/rickAndMortyAPI";


export function startServer() {
  const PORT = process.env.PORT || 4000;
  const app: Express = express();

  app.use(cors());

  app.get('/api/characters', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const search = req.query.search as string;
    const humans = (req.query.humans as string) === 'true' || false;

    const result = await getCharacters(page, humans, search);

    res.json(result);
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });

  return app;
}