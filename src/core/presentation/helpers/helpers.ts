import { Response } from "express";

export const ok = (res: Response, data: any) => {
  return res.status(200).json(data);
};

export const badRequest = (res: Response, message?: string) => {
  return res.status(400).json({ error: message ?? "Invalid data" });
};

export const notFound = (res: Response) => {
  return res.status(404).json({ error: "Data not found" });
};

export const serverError = (res: Response, error: Error) => {
  return res
    .status(500)
    .json({ error: "Internal Server Error", message: error.message })
}