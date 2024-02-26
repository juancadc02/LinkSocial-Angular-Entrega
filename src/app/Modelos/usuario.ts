export interface Usuario{
    idUsuarios?: string,
    nombreCompleto : string,
    correoElectronico :string,
    movilUsuario :string,
    contrasena :string,
    fchRegistro :string,
    fchNacimiento :string,
    rolAcceso ?:string,
}