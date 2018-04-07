// @flow

const jsxStopChars = ['<', '>', '{', '}', "'", '"'];

function shouldBeEscaped(s: string): boolean {
    return jsxStopChars.some(jsxStopChar => s.includes(jsxStopChar));
}

function preserveTrailingSpace(s: string): string {
    let result = s;
    if (result === '') {
        return result;
    }
    if (result.trim() === '') {
        return `{'${result}'}`;
    }

    if (result.endsWith(' ')) {
        result = result.replace(/^(.*\S)(\s*)$/, "$1{'$2'}");
    }

    if (result.startsWith(' ')) {
        result = result.replace(/^(\s*)(\S.*)$/, "{'$1'}$2");
    }

    return result;
}

function escape(s: string): string {
    if (!shouldBeEscaped(s)) {
        return s;
    }

    return `{'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'}`;
}

function printString(s: string) {
    return preserveTrailingSpace(escape(s));
}

export { printString };
