import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})

export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    //v = v.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^<]+)/g, '<center><iframe width="640" height="360" src="http://www.youtube.com/embed/$1?modestbranding=1&rel=0&wmode=transparent&theme=light&color=white" frameborder="0" allowfullscreen></iframe></center>').replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/([^<]+)/g, '<center><iframe src="//player.vimeo.com/video/$1" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></center>').replace(/(?:http:\/\/)?(?:dailymotion\.com|dai\.ly)\/([^<]+)/g, '<center><iframe frameborder="0" width="560" height="315" src="http://www.dailymotion.com/embed/video/$1?logo=0&foreground=ffffff&highlight=1bb4c6&background=000000" allowfullscreen></iframe></center>');
    var htmlObject = document.createElement("div");
    htmlObject.innerHTML = v;

    //Recorremos todas las etiquetas figure
    htmlObject.querySelectorAll("figure.media").forEach(function(el) {
		console.log(el);
    	var url = el.querySelector("oembed").getAttribute("url") //obtenemos la url del video.

    	 //Creamos un iframe y añadimos los atributos correspondiente
	    var iframe = document.createElement("iframe");
	    iframe.src = url;
	    iframe.width="100%";
	    iframe.height="500";
	    iframe.frameBorder= "0";
	    iframe.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
	    iframe.allowFullscreen;
	    //Añadimos el iframe al elemento actual
	    el.append(iframe)

    });
    return this._sanitizer.bypassSecurityTrustHtml(htmlObject.innerHTML);
  }
}