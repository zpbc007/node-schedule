# node-schedule

use node-cron module to schedule exec npm command

## 使用方法

1. clone repo
```bash
git clone xxx
```

2. install deps

```bash
npm i
```

3. add config.json

```json
[{
    "time": "*/1 * * * *",
    "commands": [
        "zpnas -v",
        "zpnas ddns -h"
    ]
}, {
    "time": "*/1 * * * *",
    "commands": [
        "zpnas -v",
        "zpnas ddns -h"
    ]
}]
```

4. run

```bash

```
