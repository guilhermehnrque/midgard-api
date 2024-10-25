export interface OrganizerCreatedGroupObserver {
    save(groupId: number, membersId: number[]): Promise<void>;
}