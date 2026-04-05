declare module "pptxgenjs" {
  interface TextOptions {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    fontSize?: number;
    bold?: boolean;
    color?: string;
    breakLine?: boolean;
  }

  interface BulletTextRun {
    text: string;
    options?: {
      bullet?: {
        indent?: number;
      };
    };
  }

  interface WriteOptions {
    outputType: "nodebuffer";
  }

  class Slide {
    addText(text: string | BulletTextRun[], options?: TextOptions): void;
  }

  export default class PptxGenJS {
    layout: string;
    author: string;
    subject: string;
    title: string;
    addSlide(): Slide;
    write(options: WriteOptions): Promise<Buffer>;
  }
}
