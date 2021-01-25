# Canvas

## Getting Canvas Instance

```ts
@ViewChild('canvas')
canvas: ElementRef;

//Other code

//In function
this.ctx = this.canvas.nativeElement.getContext('2d');
```
