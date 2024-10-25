import { OrganizerCreatedGroupObserver } from "../../domain/observers/OrganizerCreatedGroupObserver";

export class OrganizerCreatedGroupSubject {
    private static instance: OrganizerCreatedGroupSubject;
    private observers: OrganizerCreatedGroupObserver[] = [];

    private constructor() { }

    public static getInstance(): OrganizerCreatedGroupSubject {
        if (!OrganizerCreatedGroupSubject.instance) {
            OrganizerCreatedGroupSubject.instance = new OrganizerCreatedGroupSubject();
        }
        return OrganizerCreatedGroupSubject.instance;
    }

    subscribe(observer: OrganizerCreatedGroupObserver) {
        this.observers.push(observer);
    }

    unsubscribe(observer: OrganizerCreatedGroupObserver) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    async notify(userIdPk: number, groupId: number): Promise<void> {
        await Promise.all(this.observers.map(observer => observer.save(groupId, [userIdPk])));
    }
}
