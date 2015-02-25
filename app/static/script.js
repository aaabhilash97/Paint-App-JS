Array.prototype.insert=function(index,item){
		this.splice(index,0,item);
};
	var tool;
	var cord={};
	var movestate=false;
	var color="black";
	var savepoints=[];
	var savecount=-1;
	var pointersize=1;
	var ol=[];
	var undool=[];
	function ollist(update){
		if(document.getElementById("savename").value){
        	$.post('/savedata', {
        	'ol': JSON.stringify(ol),
		'name':document.getElementById("savename").value,
		'update':update
   		 }).done(function success(datas){
			if(datas[1]=="error" && confirm("data already exist do you want update it"))
						ollist(1);
			else alert(datas[1]);
        	}).fail(function error(){
                alert("error");
           });
	};
	};
	function setsize(value){
		pointersize=value;
		document.getElementById("sizeofbrush").innerHTML=pointersize;
	};
	function settool(x){
		tool=x;
		document.getElementById("tooldisplay").innerHTML=tool;
	};
	function savestate(){
		var l=document.getElementById("a").toDataURL();
		savepoints.insert(savecount+1,l);
		savecount++;
	};
	function undo(){
		if(savecount>=0){
			clearscreen();
			var c = document.getElementById("a");
                	var ctx = c.getContext("2d");
			var img=new Image();
			if(savecount>0){
				undool.push(ol.pop());
                		img.src = savepoints[savecount-1];
                		ctx.drawImage(img,0,0);};
				savecount--;
		};
	};
	function redo(){
                if(savecount<savepoints.length-1){
                        clearscreen();
                        var c = document.getElementById("a");
                        var ctx = c.getContext("2d");
                        var img=new Image();
			img.src = savepoints[savecount+1];
			ol.push(undool.pop());
                        ctx.drawImage(img,0,0);
			if(savecount<savepoints.length-1)
                        	savecount++;
                };
        };
	function save(){
		var b_canvas = document.getElementById("a");
		var image=b_canvas.toDataURL();
		var link = document.createElement("a");
    		link.download = "";
    		link.href = image;
    		link.click();
	};
	function preview(){
                var b_canvas = document.getElementById("a");
                var image=b_canvas.toDataURL();
		window.open(image,'_blank');
        };
	function setstart(event){
		if(tool=="eraser" || tool=="pen")
			movestate=true;
		var c=document.getElementById("a");
		cord.sx=event.clientX-c.getBoundingClientRect().left;
		cord.sy=event.clientY-c.getBoundingClientRect().top;
	};
	function setend(event){
                movestate=false;
                var c=document.getElementById("a");
                cord.ex=event.clientX-c.getBoundingClientRect().left-cord.sx;
                cord.ey=event.clientY-c.getBoundingClientRect().top-cord.sy;
		drawshape(event);
		if(tool=="pen" || tool=="eraser")
			savestate();
        };
	function drawshape(event){
		var b_canvas = document.getElementById("a");
                var b_context = b_canvas.getContext("2d");
		b_context.fillStyle=color;
		b_context.strokeStyle=color;
		b_context.lineWidth=pointersize;
		b_context.beginPath();
		if(tool=="rectangle"){
			b_context.strokeRect(cord.sx,cord.sy,cord.ex,cord.ey);
			b_context.stroke();
			ol.push({type:tool,start:[cord.sx,cord.sy],spec:[cord.ex,cord.ey],color:color,pointersize:pointersize});
		};
		if(tool=="fillrectangle"){
                        b_context.fillRect(cord.sx,cord.sy,cord.ex,cord.ey);
			ol.push({type:tool,start:[cord.sx,cord.sy],spec:[cord.ex,cord.ey],color:color,pointersize:pointersize});
                };
		if(tool=="circle" || tool=="filledcircle"){
		       var radius=Math.sqrt(Math.pow(cord.ex,2)+Math.pow(cord.ey,2));
		       b_context.beginPath();
                       b_context.arc(cord.sx,cord.sy,radius,0,Math.PI*2,false);
		       if(tool=="circle")
		       		b_context.stroke();
		       else
				b_context.fill();
			ol.push({type:tool,centre:[cord.sx,cord.sy],radius:radius,color:color,pointersize:pointersize});
                };
		if(tool=="text"){
			var text=document.getElementById("textbox").value;
			var size=Math.sqrt(Math.pow(cord.ex,2)+Math.pow(cord.ey,2));
			font=size+"px Arial";
			b_context.font =size+"px Arial";
			if(cord.ey>=0)
				b_context.textBaseline = "top";
			else
				b_context.textBaseline = "bottom";
			b_context.fillText(text,cord.sx,cord.sy);
			ol.push({type:tool,font:font,start:[cord.sx,cord.sy],size:size,color:color,content:text,pointersize:pointersize,ey:cord.ey});
		};
		if(tool=="line"){
                	var x=event.clientX-b_canvas.getBoundingClientRect().left;
                	var y=event.clientY-b_canvas.getBoundingClientRect().top;
			b_context.moveTo(cord.sx,cord.sy);
			b_context.lineTo(x,y);
			b_context.stroke();
			ol.push({type:tool,start:[cord.sx,cord.sy],end:[x,y],color:color,pointersize:pointersize});
			b_context.closePath();
		};
		if(tool!="pen" && tool!="eraser")
			savestate();
	};
	function clearscreen(){
                var b_canvas = document.getElementById("a");
                b_canvas.width = b_canvas.width;
		ol=[];
        };
	function moveactions(event){
		var bcan = document.getElementById("a");
                var b = bcan.getContext("2d");
		ps=pointersize;
                var x=event.clientX-bcan.getBoundingClientRect().left;
                var y=event.clientY-bcan.getBoundingClientRect().top;
                b.beginPath();
		if (tool=="eraser" && movestate==true){
			b.clearRect(x,y,ps,ps);
			ol.push({type:"eraser",start:[x,y],spec:[ps,ps],color:color,pointersize:pointersize});
                };
		if(tool=="pen" && movestate==true){
			b.fillStyle=color;
                        b.fillRect(x,y,ps,ps);
			ol.push({type:"fillrectangle",start:[x,y],spec:[ps,ps],color:color,pointersize:pointersize});
		};
	};
        function mycan(event){
		if(navigator.userAgent.search("Chrom")==-1){
			alert("use chrome/chromium for better experience");
			document.getElementById("browseralert").style.display="inline-block";};
    		var img = document.getElementById("colormap");
var b_canvas = document.getElementById("grade1");
var b_context = b_canvas.getContext("2d");
b_context.fillStyle="black";
b_context.fillRect(0,0,20,20);
var b_canvas = document.getElementById("grade2");
var b_context = b_canvas.getContext("2d");
b_context.fillStyle="white";
b_context.fillRect(0,0,20,20);
		var c = document.getElementById("grade1sele");
                var ctx = c.getContext("2d");
               var img = document.getElementById("colormap");
                ctx.drawImage(img,0,0);
		var c = document.getElementById("grade2sele");
                var ctx = c.getContext("2d");
                ctx.drawImage(img,0,0);
	};
	function rgbToHex(r, g, b){
    		if (r > 255 || g > 255 || b > 255)
        	throw "Invalid color component";
    		return ((r << 16) | (g << 8) | b).toString(16);
    	};
	function setgradient(){
	document.getElementById("grade1sele").style.display="None";
	document.getElementById("grade2sele").style.display="None";
	document.getElementById("selectedcolor").innerHTML="gradient of these two colors";
		var x=document.getElementById("grade1").innerHTML;
		var y=document.getElementById("grade2").innerHTML;
		var c = document.getElementById("a");
		var ctx = c.getContext("2d");
		var grd = ctx.createLinearGradient(0,100,100,0);
		grd.addColorStop(0,x);
		grd.addColorStop(1,y);
		color=grd;
	};
	function show(x){
		if(x=='grade2sele')
		document.getElementById("grade1sele").style.display="None";
		else
			document.getElementById("grade2sele").style.display="None";
		document.getElementById(x).style.display="inline-block";
	};
	function setgrad(t,event,box){
                var c = document.getElementById(t.id);
                var ctx = c.getContext("2d");
                var x=event.clientX-c.getBoundingClientRect().left;
                var y=event.clientY-c.getBoundingClientRect().top;
                var p=ctx.getImageData(x, y, 1, 1).data;
                var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
		color=hex;
		document.getElementById("selectedcolor").innerHTML=color;
		var c = document.getElementById(box);
		c.innerHTML=hex;
                var ctx = c.getContext("2d");
                ctx.fillStyle=hex;
		ctx.fillRect(0,0,20,20);
		document.getElementById("grade1sele").style.display="None";
        document.getElementById("grade2sele").style.display="None";
        };
