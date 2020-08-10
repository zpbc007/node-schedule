import { spawn } from 'child_process'

export function exec(cmd: string, cb?: (err?: any) => void) {
    const [command, ...config] = cmd.split(/\s+/g)
    const cmd$ = spawn(command, config, { stdio: 'inherit' })

    if (cmd$.stdout) {
        cmd$.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
    }

    if (cmd$.stderr) {
        cmd$.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
    }

    cmd$.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        let err = null;
        if (code) {
            err = new Error('command "' + cmd + '" exited with wrong status code "' + code + '"');
        }
        if (cb) cb(err);
    });
}

export function series(cmds: string[], cb: (err?: any) => void) {
    let index = 0
    const execNext = function () {
        exec(cmds[index]!, function (err) {
            if (err) {
                cb(err);
            } else {
                index++
                if (index < cmds.length) execNext();
                else cb(null);
            }
        });
    };
    execNext();
};