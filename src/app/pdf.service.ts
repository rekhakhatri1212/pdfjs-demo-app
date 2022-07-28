import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';

export class PdfService {

  constructor() {
    const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
    GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
  }

  // My use case demonstrating strongly typed usage.
  public async pdfToImageDataURLAsync(pdfFile: File): Promise<string> {
    const arrayBuffer = await new Response(pdfFile).arrayBuffer();
    const canvas: any = document.getElementById('the-canvas');
    const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
    const data: any = arrayBuffer;

    const pdf = await getDocument(data).promise;
    const page = await pdf.getPage(1);

    const viewPortParams = { scale: 2 };
    const viewport = page.getViewport(viewPortParams);

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    const renderedPage = await page.render(renderContext).promise;
    const res = canvas.toDataURL();
    if (pdf != null) pdf.destroy();
    return res;
  }
}