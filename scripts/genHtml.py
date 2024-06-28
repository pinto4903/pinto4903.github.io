for i in range(1, 7):
    for j in range(0, 20):
        print(f'<rect id="s{i}f{j}" string={i} fret={j} class="rectbutton" x="{round(0.5 + 5 * j, 2)}%" y="{round((100 / 14) * (i + (i-1)) , 2)}%" />')
