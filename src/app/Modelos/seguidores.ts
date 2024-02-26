export interface Seguidores{
    idSeguidor?:string, 
    idSeguidorSolicitud:string, //El que tiene la sesion iniciada
    idSeguidorRecibido:string, //El del perfil que he visitado
    fchSeguimiento:Date
}