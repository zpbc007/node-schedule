import { promisify } from 'util'
import { readFile } from 'fs'
import { schedule } from 'node-cron'
import { series } from './child_helper'
import { resolve } from 'path'

interface IConfigItem {
    time: string
    commands: string[]
}

const asyncReadFile = promisify(readFile)

async function run(configFilePath: string) {
    // 读取配置文件
    const config: IConfigItem[] = JSON.parse(await asyncReadFile(configFilePath, { encoding: 'utf-8' }))
    config.forEach(({ time, commands }) => {
        schedule(time, () => {
            console.log('start schedule')
            series(commands, (err) => {
                console.log('end schedule', err ? err : '')
            })
        })
    })
}

run(resolve(__dirname, '../config.json'))