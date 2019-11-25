async function testAsync () {
  return 'Hello Async'
}

const result = testAsync()
console.log(result) // Promise { 'Hello Async' }
// 单独 async 返回的是Promise

function getSomething () {
  return 'somthing'
}

async function test () {
  // await等待的只是一个表达式，这个表达式在官方文档里说的是Promise对象，可是它也可以接受普通值
  const result1 = await getSomething()
  const result2 = await testAsync()
  console.log(result1, result2) // somthing Hello Async
}

test()

function takeLongTime () {
  return new Promise(resolve => {
    setTimeout(() => resolve('long_time_value'), 2000)
  })
}

async function longTime () {
  const result3 = await takeLongTime()
  console.log(result3)
}

longTime()
