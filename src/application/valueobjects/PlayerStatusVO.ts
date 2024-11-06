export class PlayerStatusVO {

    public static readonly WAITING = "WAITING";
    public static readonly CONFIRMED = "CONFIRMED";
    public static readonly DECLINED = "DECLINED";
    
    public static readonly statuses = [
        PlayerStatusVO.WAITING,
        PlayerStatusVO.CONFIRMED,
        PlayerStatusVO.DECLINED
    ] as const;

    public static fromString(playerStatus: string): PlayerStatusType {
        if (PlayerStatusVO.statuses.includes(playerStatus.toUpperCase() as PlayerStatusType)) {
            return playerStatus as PlayerStatusType;
        }

        throw new Error(`Invalid player status: ${playerStatus}`);
    }
}

export type PlayerStatusType = typeof PlayerStatusVO.statuses[number];