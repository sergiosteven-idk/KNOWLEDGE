// Archivo de declaraciones ligeras para TypeScript.
// No importa la implementación real aquí (api.js), sólo habilita
// que TypeScript reconozca los nombres exportados cuando se importan
// desde "../services/api.js" en los componentes.

export declare function subirContenido(formData: any, setProgress?: (n: number) => void): Promise<any>;
export declare function obtenerContenidoUsuario(userId: number): Promise<any>;
export declare function obtenerProgreso(userId: number): Promise<any>;
export declare function obtenerFeed(): Promise<any>;
export declare function eliminarContenido(id: number): Promise<any>;

declare const api: any;
export default api;
