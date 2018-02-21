Uses [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith). Grabs a folder of images and turns them into a sprite, creates a Sass mixin and class for each based on filename.

## Usage

Given a file named `facebook.png`, you can use this Sass mixin:

```scss
@include sprite('sprite-facebook');
```

Or this HTML class:

```html
<span class="sprite_facebook"></span>
```

## Commands

- `gulp sprite` - Generates the sprite
- `gulp watch:sprite` - Watch for images modifed and regenerate the sprite

## Config

- `config.sprite.src` - Array or String of globbed PNG files
- `config.sprite.imgDest` - Destination directory for the sprite image file
- `config.sprite.cssDest` - Destination directory for the sprite SCSS file
- `config.sprite.imgName` - Name of the sprite image file
- `config.sprite.cssName` - Name of the sprite SCSS file
- `config.sprite.imgPathPrefix` - Sprite image path prefix
- `config.sprite.spritesheetName` - Name of the sprite
- `config.sprite.imagemin` - Enable imagemin compression for the sprite image file

---
