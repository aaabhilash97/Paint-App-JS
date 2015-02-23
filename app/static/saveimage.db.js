function suggest(e){
	$.post('/suggest',{'text':e.value}).done(function ok(datas){
			document.getElementById("suggestion").innerHTML=datas[1];
		}).fail(function error(){
			});
	};
function imagedb(update){
	pl=[{type:"image",data:document.getElementById("a").toDataURL()}];
	if(document.getElementById("savename").value){
	console.log("name",document.getElementById("savename").value);
	$.post('/savedata', {
                'ol': JSON.stringify(pl),
                'name':document.getElementById("savename").value,
		'update':update
                 }).done(function success(datas){
                        if(datas[1]=="error" && confirm("data already exist do you want update it"))
                                                imagedb(1);
                        else alert(datas[1]);
                }).fail(function error(){
                alert("error");
           });
	};
        };
