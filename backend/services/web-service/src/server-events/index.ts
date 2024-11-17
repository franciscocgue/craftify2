// SSE (server-side events)

import { Response } from "express";

type ClientType = Response;
const clients: Record<string, ClientType> = {};

const addClient = (client: ClientType, clientId: string) => {
    clients[clientId] = client;
}

const removeClient = (clientId: string) => {
    delete clients[clientId];
}


export {
    clients,
    addClient,
    removeClient,
}
