import * as Fs from 'node:fs'

const Banks = Fs.readFileSync('exclusions/banks.txt').toString().split('\n')
const Sorted = Banks.toSorted((A, B) => {
  if (A.startsWith('//')) {
    return 0
  }
  // Sort by alphabetical order
  return A.localeCompare(B)
})

process.exit(JSON.stringify(Banks) === JSON.stringify(Sorted) ? 0 : 1)