function fn<T>(a: T): T {
	return a
}

fn<string>('hello')
fn(123)

interface Inter {
	name: string
}

function foo<T extends Inter>(a: T): string {
	return a.name
}

function foo1<T, K>(a: T, b: K): T {
	console.log(b)
	return a
}

foo1<string, number>('jc', 123)
