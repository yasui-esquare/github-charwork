# github-charwork

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

## `who-to-greet`

**Required** The name of the person to greet. デフォルトは `"World"`。

## Outputs

## `time`

The time we greeted you.

## 使用例

uses: yasui-esquare/github-chatwork@v0.1
with:
  who-to-greet: 'Mona the Octocat'
