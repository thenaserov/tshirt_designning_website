var canvas;
var tshirts = new Array(); //prototype: [{style:'x',color:'white',front:'a',back:'b',price:{tshirt:'12.95',frontPrint:'4.99',backPrint:'4.99',total:'22.47'}}]
var a;
var b;
var line1;
var line2;
var line3;
var line4;
 	$(document).ready(function() {
		//setup front side canvas 
 		canvas = new fabric.Canvas('tcanvas', {
		  hoverCursor: 'pointer',
		  selection: true,
		  selectionBorderColor:'blue'
		});
		// piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
 		canvas.findTarget = (function(originalFn) {
		  return function() {
		    var target = originalFn.apply(this, arguments);
		    if (target) {
		      if (this._hoveredTarget !== target) {
		    	  canvas.fire('object:over', { target: target });
		        if (this._hoveredTarget) {
		        	canvas.fire('object:out', { target: this._hoveredTarget });
		        }
		        this._hoveredTarget = target;
		      }
		    }
		    else if (this._hoveredTarget) {
		    	canvas.fire('object:out', { target: this._hoveredTarget });
		      this._hoveredTarget = null;
		    }
		    return target;
		  };
		})(canvas.findTarget);

 		canvas.on('object:over', function(e) {		
		  //e.target.setFill('red');
		  //canvas.renderAll();
		});
		
 		canvas.on('object:out', function(e) {		
		  //e.target.setFill('green');
		  //canvas.renderAll();
		});
		 		 	 
		document.getElementById('add-text').onclick = function() {
			var text = $("#text-string").val();
		    var textSample = new fabric.Text(text, {
		      left: fabric.util.getRandomInt(0, 200),
		      top: fabric.util.getRandomInt(0, 400),
		      fontFamily: 'helvetica',
		      angle: 0,
		      fill: '#000000',
		      scaleX: 0.5,
		      scaleY: 0.5,
		      fontWeight: '',
	  		  hasRotatingPoint:true
		    });		    
            canvas.add(textSample);	
            canvas.item(canvas.item.length-1).hasRotatingPoint = true;    
            $("#texteditor").css('display', 'block');
            $("#imageeditor").css('display', 'block');
	  	};
	  	$("#text-string").keyup(function(){	  		
	  		var activeObject = canvas.getActiveObject();
		      if (activeObject && activeObject.type === 'text') {
		    	  activeObject.text = this.value;
		    	  canvas.renderAll();
		      }
	  	});
	  	$(".img-polaroid").click(function(e){
	  		var el = e.target;
	  		/*temp code*/
	  		var offset = 50;
	        var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
	        var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
	        var angle = fabric.util.getRandomInt(-20, 40);
	        var width = fabric.util.getRandomInt(30, 50);
	        var opacity = (function(min, max){ return Math.random() * (max - min) + min; })(0.5, 1);
	        
	  		fabric.Image.fromURL(el.src, function(image) {
		          image.set({
		            left: left,
		            top: top,
		            angle: 0,
		            padding: 10,
		            cornersize: 10,
	      	  		hasRotatingPoint:true
		          });
		          //image.scale(getRandomNum(0.1, 0.25)).setCoords();
		          canvas.add(image);
		        });
	  	});	  		  
	  document.getElementById('remove-selected').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      canvas.remove(activeObject);
		      $("#text-string").val("");
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        canvas.remove(object);
		      });
		    }
	  };
	  document.getElementById('bring-to-front').onclick = function() {		  
		    // var activeObject = canvas.getActiveObject(),
		    //     activeGroup = canvas.getActiveGroup();
		    // if (activeObject) {
		    //   activeObject.bringToFront();
		    // }
		    // else if (activeGroup) {
		    //   var objectsInGroup = activeGroup.getObjects();
		    //   canvas.discardActiveGroup();
		    //   objectsInGroup.forEach(function(object) {
		    //     object.bringToFront();
		    //   });
		    // }
	  };
	  document.getElementById('send-to-back').onclick = function() {		  
		    // var activeObject = canvas.getActiveObject(),
		    //     activeGroup = canvas.getActiveGroup();
		    // if (activeObject) {
		    //   activeObject.sendToBack();
		    // }
		    // else if (activeGroup) {
		    //   var objectsInGroup = activeGroup.getObjects();
		    //   canvas.discardActiveGroup();
		    //   objectsInGroup.forEach(function(object) {
		    //     object.sendToBack();
		    //   });
		    // }
	  };

	  
   


	  $("#text-bold").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
		    activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');		    
		    canvas.renderAll();
		  }
		});
	  $("#text-italic").click(function() {		 
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');		    
		    canvas.renderAll();
		  }
		});
	  $("#text-strike").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
		    canvas.renderAll();
		  }
		});
	  $("#text-underline").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
		    canvas.renderAll();
		  }
		});
	  $("#text-left").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'left';
		    canvas.renderAll();
		  }
		});
	  $("#text-center").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'center';		    
		    canvas.renderAll();
		  }
		});
	  $("#text-right").click(function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'right';		    
		    canvas.renderAll();
		  }
		});	  
	  $("#font-family").change(function() {
	      var activeObject = canvas.getActiveObject();
	      if (activeObject && activeObject.type === 'text') {
	        activeObject.fontFamily = this.value;
	        canvas.renderAll();
	      }
	    });	  
		$('#text-bgcolor').miniColors({
			change: function(hex, rgb) {
			  var activeObject = canvas.getActiveObject();
		      if (activeObject && activeObject.type === 'text') {
		    	  activeObject.backgroundColor = this.value;
		        canvas.renderAll();
		      }
			},
			open: function(hex, rgb) {
				//
			},
			close: function(hex, rgb) {
				//
			}
		});		
		$('#text-fontcolor').miniColors({
			change: function(hex, rgb) {
			  var activeObject = canvas.getActiveObject();
		      if (activeObject && activeObject.type === 'text') {
		    	  activeObject.fill = this.value;
		    	  canvas.renderAll();
		      }
			},
			open: function(hex, rgb) {
				//
			},
			close: function(hex, rgb) {
				//
			}
		});
		
		$('#text-strokecolor').miniColors({
			change: function(hex, rgb) {
			  var activeObject = canvas.getActiveObject();
		      if (activeObject && activeObject.type === 'text') {
		    	  activeObject.strokeStyle = this.value;
		    	  canvas.renderAll();
		      }
			},
			open: function(hex, rgb) {
				//
			},
			close: function(hex, rgb) {
				//
			}
		});
	
		//canvas.add(new fabric.fabric.Object({hasBorders:true,hasControls:false,hasRotatingPoint:false,selectable:false,type:'rect'}));
	   $("#drawingArea").hover(
	        function() { 	        	
	        	 canvas.add(line1);
		         canvas.add(line2);
		         canvas.add(line3);
		         canvas.add(line4); 
		         canvas.renderAll();
	        },
	        function() {	        	
	        	 canvas.remove(line1);
		         canvas.remove(line2);
		         canvas.remove(line3);
		         canvas.remove(line4);
		         canvas.renderAll();
	        }
	    );
	   
	   $('.color-preview').click(function(){
		   var color = $(this).css("background-color");
		   document.getElementById("shirtDiv").style.backgroundColor = color;		   
	   });
	   
	   $('#flip').click(
		   function() {			   
			   	// if ($(this).attr("data-original-title") == "Show Back View") {
			   	// 	$(this).attr('data-original-title', 'Show Front View');			        		       
			    //     $("#tshirtFacing").attr("src","img/crew_back.png");			        
			    //     a = JSON.stringify(canvas);
			    //     canvas.clear();
			    //     try
			    //     {
			    //        var json = JSON.parse(b);
			    //        canvas.loadFromJSON(b);
			    //     }
			    //     catch(e)
			    //     {}
			        
			    // } else {
			    // 	$(this).attr('data-original-title', 'Show Back View');			    				    	
			    // 	$("#tshirtFacing").attr("src","img/crew_front.png");			    	
			    // 	b = JSON.stringify(canvas);
			    // 	canvas.clear();
			    // 	try
			    //     {
			    //        var json = JSON.parse(a);
			    //        canvas.loadFromJSON(a);			           
			    //     }
			    //     catch(e)
			    //     {}
			    // }		
			   	// canvas.renderAll();
			   	// setTimeout(function() {
			   	// 	canvas.calcOffset();
			    // },200);			   	
        });	   
	   $(".clearfix button,a").tooltip();
	   line1 = new fabric.Line([0,0,200,0], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line2 = new fabric.Line([199,0,200,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line3 = new fabric.Line([0,0,0,400], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line4 = new fabric.Line([0,400,200,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});


	   
	 });//doc ready


	 
	 
	 function getRandomNum(min, max) {
	    return Math.random() * (max - min) + min;
	 }
	 
	 function onObjectSelected(e) {	 
	    var selectedObject = e.target;
	    $("#text-string").val("");
	    selectedObject.hasRotatingPoint = true
	    if (selectedObject && selectedObject.type === 'text') {
	    	//display text editor	    	
	    	$("#texteditor").css('display', 'block');
	    	$("#text-string").val(selectedObject.getText());	    	
	    	$('#text-fontcolor').miniColors('value',selectedObject.fill);
	    	$('#text-strokecolor').miniColors('value',selectedObject.strokeStyle);	
	    	$("#imageeditor").css('display', 'block');
	    }
	    else if (selectedObject && selectedObject.type === 'image'){
	    	//display image editor
	    	$("#texteditor").css('display', 'none');	
	    	$("#imageeditor").css('display', 'block');
	    }
	  }
	 function onSelectedCleared(e){
		 $("#texteditor").css('display', 'none');
		 $("#text-string").val("");
		 $("#imageeditor").css('display', 'none');
	 }
	 function setFont(font){
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && activeObject.type === 'text') {
	        activeObject.fontFamily = font;
	        canvas.renderAll();
	      }
	  }
	 function removeWhite(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {			  
			  activeObject.filters[2] =  new fabric.Image.filters.RemoveWhite({hreshold: 100, distance: 10});//0-255, 0-255
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }





	  // When the user clicks on upload a custom picture
	  document.getElementById('fileToUpload').addEventListener("change", function(e){
        var reader = new FileReader();
        
        reader.onload = function (event){
            var imgObj = new Image();
            imgObj.src = event.target.result;

            // When the picture loads, create the image in Fabric.js
            imgObj.onload = function () {
                var img = new fabric.Image(imgObj);

                img.scaleToHeight(200);
                img.scaleToWidth(200); 
                canvas.centerObject(img);
                canvas.add(img);
                canvas.renderAll();
            };
        };

        // If the user selected a picture, load it
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
    }, false);






	// to save to server
function myFunction() {
  // Your code here
  // stackoverflow
  alert('در حال ارسال طرح به سبد خرید');
  var element = document.getElementById('shirtDiv');
  html2canvas(element).then(function(canvas) {
    var imageData = canvas.toDataURL('image/png');  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../../saveToServer.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      // Handle the server response
      console.log(xhr.responseText);
    };
    xhr.send('imageData=' + encodeURIComponent(imageData));
  });
};

var button = document.getElementById('addToTheBag');
button.addEventListener('click', myFunction);



// logos save
  document.getElementById('uploadForm').addEventListener('submit', function (e) {
	  alert('going for logo');
    e.preventDefault(); // Prevent the form from submitting normally
    // Create a new FormData object
    var formData = new FormData();
    formData.append('photo', document.getElementById('fileToUpload').files[0]);
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    // Set up the AJAX request
    xhr.open('POST', 'https://tishooli.com/uploadLogo.php', true);
    // Set up a handler for when the AJAX request is complete
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('File uploaded successfully.');
      } else {
        console.log('Error uploading the file.');
      }
    };
    // Send the AJAX request with the form data
    xhr.send(formData);
  });








  // ---------------------------------------------------------------------------------------------------------------


  var valueSelect = $("#tshirttype").val();
  $("#tshirttype").change(function(){
	  valueSelect = $(this).val();
  });
  $('#flipback').click(
	 function() {	
		 if (valueSelect === "img/crew_front.png") {
			 if ($(this).attr("data-original-title") == "Show Back View") {
				 $(this).attr('data-original-title', 'Show Front View');			        		       
			  $("#tshirtFacing").attr("src","img/crew_back.png");			        
			  a = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(b);
				 canvas.loadFromJSON(b);
			  }
			  catch(e)
			  {}
			  
		  } else {
			  $(this).attr('data-original-title', 'Show Back View');			    				    	
			  $("#tshirtFacing").attr("src","img/crew_front.png");			    	
			  b = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(a);
				 canvas.loadFromJSON(a);			           
			  }
			  catch(e)
			  {}
		  }		
		 }
		 
		 else if (valueSelect === "img/mens_longsleeve_front.png") {
			if ($(this).attr("data-original-title") == "Show Back View") {
				 $(this).attr('data-original-title', 'Show Front View');			        		       
			  $("#tshirtFacing").attr("src","img/mens_longsleeve_back.png");			        
			  a = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(b);
				 canvas.loadFromJSON(b);
			  }
			  catch(e)
			  {}
			  
		  } else {
			  $(this).attr('data-original-title', 'Show Back View');			    				    	
			  $("#tshirtFacing").attr("src","img/mens_longsleeve_front.png");			    	
			  b = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(a);
				 canvas.loadFromJSON(a);			           
			  }
			  catch(e)
			  {}
		  }	
		 }
		 else if (valueSelect === "img/mens_tank_front.png") {
			if ($(this).attr("data-original-title") == "Show Back View") {
				 $(this).attr('data-original-title', 'Show Front View');			        		       
			  $("#tshirtFacing").attr("src","img/mens_tank_back.png");			        
			  a = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(b);
				 canvas.loadFromJSON(b);
			  }
			  catch(e)
			  {}
			  
		  } else {
			  $(this).attr('data-original-title', 'Show Back View');			    				    	
			  $("#tshirtFacing").attr("src","img/mens_tank_front.png");			    	
			  b = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(a);
				 canvas.loadFromJSON(a);			           
			  }
			  catch(e)
			  {}
		  }	
		 }
		 else if (valueSelect === "img/mens_hoodie_front.png") {
			if ($(this).attr("data-original-title") == "Show Back View") {
				 $(this).attr('data-original-title', 'Show Front View');			        		       
			  $("#tshirtFacing").attr("src","img/mens_hoodie_back.png");			        
			  a = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(b);
				 canvas.loadFromJSON(b);
			  }
			  catch(e)
			  {}
			  
		  } else {
			  $(this).attr('data-original-title', 'Show Back View');			    				    	
			  $("#tshirtFacing").attr("src","img/mens_hoodie_front.png");			    	
			  b = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(a);
				 canvas.loadFromJSON(a);			           
			  }
			  catch(e)
			  {}
		  }	
		 }
		 /*	if ($(this).attr("data-original-title") == "Show Back View") {
				 $(this).attr('data-original-title', 'Show Front View');			        		       
			  $("#tshirtFacing").attr("src","img/crew_back.png");			        
			  a = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(b);
				 canvas.loadFromJSON(b);
			  }
			  catch(e)
			  {}
			  
		  } else {
			  $(this).attr('data-original-title', 'Show Back View');			    				    	
			  $("#tshirtFacing").attr("src","img/crew_front.png");			    	
			  b = JSON.stringify(canvas);
			  canvas.clear();
			  try
			  {
				 var json = JSON.parse(a);
				 canvas.loadFromJSON(a);			           
			  }
			  catch(e)
			  {}
		  }		*/
			 canvas.renderAll();
			 setTimeout(function() {
				 canvas.calcOffset();
		  },200);	   	
  });	


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35639689-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


$(document).ready(function(){
	$("#tshirttype").change(function(){
	  $("img[name=tshirtview]").attr("src",$(this).val());
 
	});
 
 });
 