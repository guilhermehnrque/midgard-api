export enum ListPlayerStatusEnum {
    CONFIRMADO = 'CONFIRMADO',
    DESISTENCIA = 'DESISTENCIA',
    CONFIRMACAO_PENDENTE = 'CONFIRMACAO_PENDENTE',
}

export function allowedPlayerListStatus(): ListPlayerStatusEnum[] {
    return [ListPlayerStatusEnum.CONFIRMADO, ListPlayerStatusEnum.DESISTENCIA, ListPlayerStatusEnum.CONFIRMACAO_PENDENTE];
}