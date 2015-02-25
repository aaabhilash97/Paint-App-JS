	function undoredo(e){
		if (e.ctrlKey && e.keyCode == 88 )
			undo();
		if (e.ctrlKey && e.keyCode == 90 )
			redo();
	};
	function loaddata(e){
		if(document.getElementById("savename").value){
		var loader=document.getElementById("loader");
		loader.style.display="inline-block";
		var name=e.value;
		var url='/loaddata';
                $.post(url, {'name':name
                 }).done(function success(datas){
			datas=JSON.parse(datas[1]);
			clearscreen();
			ol=[];
			tool=null;
			savepoints=[];
        		savecount=-1;
			undool=[];
			for(x in datas)
				draw_load(datas[x]);
			loader.style.display="None";
                }).fail(function error(){
		loader.style.display="None";
                alert("error");
           });
	};
        };

	function draw_load(data){
		if (data==null)
			return {}
		var b_canvas = document.getElementById("a");
                var b_context = b_canvas.getContext("2d");
		tool=data.type;
                b_context.fillStyle=data.color;
                b_context.strokeStyle=data.color;
                b_context.lineWidth=data.pointersize;
                b_context.beginPath();
		if(tool=="rectangle"){
			var x=data.start[0];y=data.start[1];
                	var w=data.spec[0];h=data.spec[1];
                        b_context.strokeRect(x,y,w,h);
                        b_context.stroke();
                        ol.push({type:'rectangle',start:[x,y],spec:[w,h],color:data.color,pointersize:data.pointersize});
                };
		if(tool=="fillrectangle"){
			var x=data.start[0];y=data.start[1];
                	var w=data.spec[0];h=data.spec[1];
                        b_context.fillRect(x,y,w,h);
                        ol.push({type:'fillrectangle',start:[x,y],spec:[w,h],color:data.color,pointersize:data.pointersize});
		};
		if(tool=="circle" || tool=="filledcircle"){
		       var x=data.centre[0];y=data.centre[1];
                       var radius=data.radius;
                       b_context.beginPath();
                       b_context.arc(x,y,radius,0,Math.PI*2,false);
                       if(tool=="circle")
                                b_context.stroke();
                       else
                                b_context.fill();
                        ol.push({type:tool,centre:[x,y],radius:data.radius,color:data.color,pointersize:data.pointersize});
		};
		if(tool=="text"){
			var x=data.start[0];y=data.start[1];
                        var text=data.content;
                        var size=data.size;
                        b_context.font =data.font;
                        var ey=data.ey;
                        if(ey>=0)
                                b_context.textBaseline = "top";
                        else
                                b_context.textBaseline = "bottom";
                        b_context.fillText(text,x,y);
                        ol.push({type:tool,start:[x,y],size:size,color:data.color,content:text,pointersize:data.pointersize,ey:ey,font:data.font});
		};
		if(tool=="line"){
                        var x=data.end[0];
                        var y=data.end[1];
			var s1=data.start[0];
			var s2=data.start[1];
                        b_context.moveTo(s1,s2);
                        b_context.lineTo(x,y);
                        b_context.stroke();
                        ol.push({type:tool,start:[s1,s2],end:[x,y],color:data.color,pointersize:data.pointersize});
                };
		if(tool=="eraser"){
			console.log("eraser");
			var x=data.start[0];y=data.start[1];
                        var ps=data.spec[0];
			b_context.clearRect(x,y,ps,ps);
                        ol.push({type:"eraser",start:[x,y],spec:[ps,ps],color:data.color,pointersize:data.pointersize});
		};
		if(tool=="image"){
			var c = document.getElementById("a");
                        var ctx = c.getContext("2d");
                        var img=new Image();
                        img.src = data.data;
                        ctx.drawImage(img,0,0);
			ol.push({type:"image",data:data.data});
		};
	if(tool!="pen")
                        savestate();
	};
