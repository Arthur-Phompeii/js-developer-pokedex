function formatNumber(number) { 
    return number.toString().padStart(3, '0');     
} 


for (let i = 1; i <= 10; i++) { 
    const pokeNumber = formatNumber(i)
}
console.log(`${pokeNumber}`); 