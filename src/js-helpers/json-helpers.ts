export module JsonUtils {
    export function DateReviver(key: string, value: any): any {

        var regexs = [

            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\Z$/

        ];
        if (typeof value === "string" && regexs.some(x => x.test(value))) {
            return new Date(value);
        }
        return value;
    }
}