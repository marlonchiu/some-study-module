# Scss 中比较常用的 mixin

> [Scss 中比较常用的 mixin](https://juejin.im/post/5d3700616fb9a07efc49c8af)

## 常用的 mixin

### 背景图片

```scss
@mixin bg-image($url) {
  background-image: url($url+"@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url($url+"@3x.png");
  }
}

// 使用方法:
.icon {
  @include bg-image(logo);
}
```

### 文本不换行

```scss
@mixin no-wrap() {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

//  使用方法:
.box {
  @include no-wrap();
}
```

### 扩展点击区域(多用于移动端)

```scss
@mixin extend-click() {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
}

//  使用方法:
.box {
  @include extend-click();
}
```

### 多行文本溢出...

```scss
@mixin multiEllipsis($line: 2) {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
}

// 使用方式:
.text {
  @include multiEllipsis(3) // 表示只显示三行,多出来的显示省略号;
}
```

### 透明度

```scss
@mixin opacity($opacity) {
  opacity: $opacity;
  $opacity-ie: $opacity * 100;
  filter: alpha(opacity=$opacity-ie); //IE8
}

// 使用方式:
.box {
  @include opacity(0.8);
}
```

### 清除浮动

```scss
@mixin clearfix() {
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
}

// 使用方式:
.box {
  @include clearfix();
}
```

### 美化占位符 placeholder 样式

```scss
@mixin beauty-placeholder($fz, $color: #999, $align: left) {
  &:-moz-placeholder {
    font-size: $fz;
    color: $color;
    text-align: $align;
  }
  &:-ms-input-placeholder {
    font-size: $fz;
    color: $color;
    text-align: $align;
  }
  &::-webkit-input-placeholder {
    font-size: $fz;
    color: $color;
    text-align: $align;
  }
}

// 使用方式:
input {
  @include beauty-placeholder(25px, #eee, left);
}
```

### 美化文本的选中

```scss
@mixin beauty-select($color, $bgcolor) {
  &::selection {
    color: $color;
    background-color: $bgcolor;
  }
}

// 使用方式:
.text {
  @include beauty-select(#fff, #000);
}
```

### 毛玻璃效果

```scss
@mixin blur($blur: 10px) {
  -webkit-filter: blur($blur);
  -moz-filter: blur($blur);
  -o-filter: blur($blur);
  -ms-filter: blur($blur);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='${blur}');
  filter: blur($blur);
  *zoom: 1;
}

// 使用方式:
.box {
  @include blur(10px);
}
```

### 滤镜: 将彩色照片显示为黑白照片、保留图片层次

```scss
@mixin grayscale() {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}

// 使用方式:
.img {
  @include grayscale();
}
```

### 文本居中

```scss
@mixin center($height: 100%) {
  height: $height;
  line-height: $height;
  text-align: center;
}

// 使用方式:
.text {
  color: #fff;
  @include center(30px);
}
```

### 修改背景色等

```scss
@mixin background(
  $border-radius: 5px,
  $bg-color: #eee,
  $color: #fff,
  $font-weight: 400
) {
  border-radius: $border-radius;
  background-color: $bg-color;
  color: $color;
  font-weight: $font-weight;
}

// 使用方式:
.container {
  @include background(10px, #eee, #fff, 700);
}
```

### flex

```scss
@mixin flex(
  $direction: row,
  $justify-content: flex-start,
  $align-items: flex-start,
  $flex-wrap: nowrap
) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify-content;
  align-items: $align-items;
  flex-wrap: $flex-wrap;
}

// 使用方式:
.box {
  @include flex(row, flex-start, flex-start, wrap);
}
```

### 鼠标 hover 显示下划线

```scss
@mixin hoverLine($height: 2px, $color: $color-text-primary) {
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    height: $height;
    width: 100%;
    background-color: $color;
    bottom: 0;
    left: 0;
  }
}

// 使用方式:
span {
  @include hoverLine(2px, $color-white);
}
```

## 一些常用全局样式

### 点击显示小手

```scss
.pointer {
  cursor: pointer;
}
```

### 使用在字符图标上 hover 时的样式

```scss
.ibass--default {
  color: red;
  transition: color 0.5s;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
```

### 文本不允许选中

```scss
.noselect {
  user-select: none;
}
```

### 点击无效

```scss
.click--invalid {
  pointer-events: none;
}
```

## 再次声明

> 作者：nanfeiyan 链接：https://juejin.im/post/5d3700616fb9a07efc49c8af来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
