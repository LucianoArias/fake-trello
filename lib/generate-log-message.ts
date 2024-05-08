import { ACTION, AuditLog } from '@prisma/client';

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `creo ${entityType.toLowerCase()}  "${entityTitle}"`;
    case ACTION.UPDATE:
      return `actualizo ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `elimino ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `acción desconocida ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
