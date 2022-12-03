export class Storage {
    private static storage: Map<string, any> = new Map<string, any>();

    public static alloc(name: string, value: any) {
        this.storage.set(name, value);
    }

    public static load<T>(name: string): T {
        if (this.storage.has(name)) {
            return this.storage.get(name);
        }

        throw "No storage reserved for " + name;
    }

    public static contains(name: string): boolean {
        return this.storage.has(name);
    }

    public static require(...keys: string[]): boolean {
        for (let key of keys) {
            if (!this.contains(key)) {
                return false;
            }
        }

        return true;
    }
}