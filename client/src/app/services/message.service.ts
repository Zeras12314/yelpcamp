import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable } from "rxjs";

interface Message {
    type: 'success' | 'error';
    messages: string[];
}


@Injectable({ providedIn: 'root' })
export class MessagesService {
    private subject = new BehaviorSubject<Message | null>(null);
    messages$: Observable<Message | null> = this.subject.asObservable();
    private timeoutId?: any; // 1. Only one timeout is active at a time, 2. New messages reset the timer, 3. No race conditions
    delayTimer: number = 5000
    showSuccess(...messages: string[]) {
        this.subject.next({ type: 'success', messages })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.clear();
            this.timeoutId = undefined;
        }, this.delayTimer);
    }

    showError(...messages: string[]) {
        this.subject.next({ type: 'error', messages })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.clear();
            this.timeoutId = undefined;
        }, this.delayTimer);
    }

    clear() {
        this.subject.next(null)
    }
}