import {LS_Prefix, LS_UserList} from './const';

export default class NoteStorage {

    static inputData: {
        users: string[],
        notes: {
            user: string,
            note: string,
            resolved?: boolean,
        }[],
        settings: any,
    } = {
        users: [],
        notes: [],
        settings: {},
    };

    static getSavedUserList(): string[] {
        return JSON.parse(localStorage.getItem(LS_UserList) || "[]");
    }

    static getNote(username: string): string {
        return localStorage.getItem(LS_Prefix + username) || "";
    }

    static addUserToSavedList(username: string) {
        let userList = this.getSavedUserList();

        if (!userList.includes(username)) {
            userList.push(username);
            localStorage.setItem(LS_UserList, JSON.stringify(userList));
        }
    }

    static removeUserFromSavedList(username: string) {
        let userList = this.getSavedUserList();
        userList = userList.filter(u => u !== username);
        if (userList.length) {
            localStorage.setItem(LS_UserList, JSON.stringify(userList));
        } else {
            localStorage.removeItem(LS_UserList);
        }
    }

    static saveNote(username: string, note: string) {
        this.addUserToSavedList(username);
        localStorage.setItem(LS_Prefix + username, note);
    }

    static deleteNote(username: string) {
        this.removeUserFromSavedList(username);
        localStorage.removeItem(LS_Prefix + username);
    }

    static exportNotes() {
        const dataObject = {
            users: this.getSavedUserList(),
            notes: this.getSavedUserList().map(user => {
                return {user: user, note: this.getNote(user)};
            }),
            settings: {},
        };
        const data = JSON.stringify(dataObject)

        const blob = new Blob([data], {type: 'text/json'});
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = 'twitch-notes-' + (Date.now()) + '.json';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    static clearData() {
        const users = this.getSavedUserList();
        for(let user of users) {
            this.deleteNote(user);
        }
    }
}