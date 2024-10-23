import fsExtra from 'fs-extra';
import createImage from "node-html-to-image";


export const getOGImage = async (...args) => { 

  const OUTPUT_DIR = "./src/assets/images/og-images";

  const templateOgImage = (titleImg, fontFamily) => {
    return `<html>
    <head>
      <style>
      * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      width: 1920px;
      height: 1080px;
      background-image: url('./wiki-og-image.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      color: #162128;
      font-family: -apple-system, system-ui, BlinkMacSystemFont,
        Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    }

    div.container {
      position: relative;
      text-align: left;
      padding: 250px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    div.container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 150px;
      height: 100%;
      background-color: #162128;
    }

    div.container::after{
      content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 50 44.4' style='enable-background:new 0 0 50 44.4;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D .st1%7Bfill:none;stroke:%23FFFFFF;stroke-width:2;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cg%3E%3Cpolygon class='st0' points='25.3,18.8 16.2,33.4 33.8,33.4 '/%3E%3Cpolygon class='st1' points='25.3,3.1 2.8,41.2 47.2,41.2 '/%3E%3Ccircle class='st0' cx='25' cy='3.1' r='3.1'/%3E%3Cg%3E%3Ccircle class='st0' cx='46.9' cy='41.2' r='3.1'/%3E%3Ccircle class='st0' cx='3.1' cy='41.2' r='3.1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      position: absolute;
      top: 50px;
      left: 50px;
      width: 50px;
      height: 50px;
    }

    h1.title {
      font-size: 5rem;
      text-transform: capitalize;
      color: #162128;
    }

    h2.title {
      position: absolute;
      top: 40px;
      left: 250px;
      font-size: 3.5rem;
      color: #162128;
    }
      </style>
    </head>
    <body>
        <div class="container">
          <h2 class="title">ROBONOMICS WIKI</h2>
          <h1 class="title">${titleImg}</h1>
        </div>
    </body>
  </html>
  `;
  }

  let title = args[1].title && args[1].title;
	let locale = args[1].locale ? args[1].locale : 'default';
  let slug = args[1].slug ? args[1].slug : 'default-slug';

  let fontFamily = 'defaultFont';

  switch(locale) {
    case 'ar':
      fontFamily = 'arFont';
      break;
    // case 'el':
    //   fontFamily = 'elFont';
    //   break;
    // case 'ko':
    //   fontFamily = 'koFont';
    //   break;
    // case 'zh':
    //   fontFamily = 'zgFont';
    //   break;
    default:
      fontFamily = 'defaultFont';
  }

  const output = locale === 'en' ? `${OUTPUT_DIR}/docs-${slug}.png` : `${OUTPUT_DIR}/${locale}-docs-${slug}.png`;
  // Only generate images for files that don't exist already
  fsExtra.access(output, (error) => {
    if (error) {
      console.log("Generating Missing Cover Images");

      createImage({
        output,
        html: templateOgImage(title, 'Roboto'),
      }).then(() => {
        console.log('The image was created successfully!')
      })
        .catch(e => console.log(e.message));
    } else {
      console.log(`The image ${slug} already exists!`)
    }
  });
}