# Cells

Demo at [https://gebbber.github.io/cells](https://gebbber.github.io/cells).

This is an old computer science demo adapted to a web browser.

As explained by ChatGPT:

**Me:**

> What's that old 'cells' simulation that's done in simple programming environments? What are the rules? Something like if a cell is empty and is surrounded by two or three, then a new one is born; if it's surrounded by more than three, it's overcrowded, less than two and it's too isolated and dies?

**ChatGPT:**

> You are referring to the Game of Life, a cellular automaton simulation invented by mathematician John Horton Conway in 1970. It is a zero-player game, meaning that once the initial state is set, the evolution of the simulation is determined by the rules and occurs automatically. The rules are as follows:
>
> 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
> 2. Any live cell with two or three live neighbors lives on to the next generation.
> 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
> 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
>
> The Game of Life is often used as a demonstration of how simple rules can lead to complex and seemingly unpredictable behavior, and it is often used as a teaching tool in computer science and mathematics.

---

I wanted to create a simple demo that would run in a web browser, and elected to use "Vanilla" JavaScript to avoid the overhead of a framework like React.

The window can be resized (or hit F11 in most web browsers to go full-screen) and the field will stay centered, with cells being removed evenly from (or random cells added to) the periphery.

Could be fun to play with the colors / box-shadows a bit more, but I'm happy with the look and it's 3:33 AM...
