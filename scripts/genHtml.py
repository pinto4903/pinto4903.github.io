for i in range(1, 7):
    for j in range(0, 20):
        print(f'<rect id="s{i}f{j}" string={i} fret={j} class="rectbutton" x="{round(0.5 + 5 * j, 2)}%" y="{round((100 / 14) * (i + (i-1)) , 2)}%" />')

for i in range(1, 5):
    print(f'<line class="str" x1="{round((i*70/5)+20,2)}%" x2="{round((i*70/5)+20,2)}%" y1="20%" y2="100%" />')

for i in range(1, 4):
    print(f'<line class="str" x1="20%" x2="90%" y1="{round((i*80/4)+20,2)}%" y2="{round((i*80/4)+20,2)}%" />')