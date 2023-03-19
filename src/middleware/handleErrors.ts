import { Error } from 'mongoose'
import { NextFunction, Response, Request } from 'express'
export function handleError (error: any, request: Request, response: Response, next: NextFunction): Response {
  if (error instanceof Error.CastError) {
    // Error al convertir un parámetro de la URL a un ObjectId de MongoDB
    return response.status(400).json({
      message: 'ID inválido'
    })
  } else if (error.code === 11000) {
    // Error de clave duplicada al crear un documento en MongoDB
    return response.status(409).json({
      message: 'Ya existe un documento con ese valor'
    })
  } else if (error instanceof Error.ValidationError) {
    // Error de validación de Mongoose al guardar un documento
    return response.status(400).json({
      message: 'Error de validación',
      details: error.errors
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(500).json({
      message: 'token is missing or invalid'
    })
  } else {
    // Otros errores
    console.error(error.stack)
    return response.status(500).json({
      message: 'Error interno del servidor'
    })
  }
}
