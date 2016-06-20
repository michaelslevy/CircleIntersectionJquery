/* algorithm adapted from this script http://csharphelper.com/blog/2014/09/determine-where-two-circles-intersect-in-c/ */
;(function ( $, window, document, undefined ) {
	$.fn.CircleEquation = function(settings){
		 var self=this;  	
		 console.log($(self).attr("cy"));
    		
    	circle1=new Circle(0,0,0);
		circle2=new Circle(0,0,0);
    		
		 var config = {
			circleToTest:'' //svg circle node to test against
        }
		  
		if (settings) {
            $.extend(config, settings);
        }
        			        
		var init = function() {
		  self.settings = $.extend({}, config, settings);
		  			  	
		  	if(typeof config.circleToTest==="undefined"){
		  		console.log("circleToTest is undefined");
		  		return false;
		  	}
		  
		  	circle1.cx=Number($(self).attr('cx'));
			circle1.cy=Number($(self).attr('cy'));
			circle1.radius=Number($(self).attr('r')); 
			
			circle2.cx=Number($(config.circleToTest).attr('cx'));
			circle2.cy=Number($(config.circleToTest).attr('cy'));
			circle2.radius=Number($(config.circleToTest).attr('r')); 
					  			  
		  	return self;
		}             
        
        // Find the points where the two circles intersect.
       self.FindCircleCircleIntersections=function(){
			var cx0=circle1.cx;
			var cy0=circle1.cy;
			var radius0=circle1.radius;
			
			var cx1=circle2.cx;
			var cy1=circle2.cy;
			var radius1=circle2.radius;
			
			var intersection1;
			var intersection2;
		
	   		// Find the distance between the centers.
	    	var dx = cx0 - cx1;
	    	var dy = cy0 - cy1;
	    	var dist = Math.sqrt(dx * dx + dy * dy);
	
	    	// See how many solutions there are.
	    	if (dist > radius0 + radius1){
		        return false;
		    }
		    else if (dist < Math.abs(radius0 - radius1))
		    {
		        // No solutions, one circle contains the other.
		        return false;
		    }
		    else if ((dist == 0) && (radius0 == radius1))
		    {
		        // No solutions, the circles coincide.
		        return false;
		    }
		    else
		    {
		        // Find a and h.
		        var a = (radius0 * radius0 -
		            radius1 * radius1 + dist * dist) / (2 * dist);
		        var h = Math.sqrt(radius0 * radius0 - a * a);
		
		        // Find P2.
		        var cx2 = cx0 + a * (cx1 - cx0) / dist;
		        var cy2 = cy0 + a * (cy1 - cy0) / dist;
		
		        // Get the points P3.
		        intersection1 = new Coords(
		            (cx2 + h * (cy1 - cy0) / dist),
		            (cy2 - h * (cx1 - cx0) / dist));
		        intersection2 = new Coords(
		            (cx2 - h * (cy1 - cy0) / dist),
		            (cy2 + h * (cx1 - cx0) / dist));
		
				var intersections=[intersection1, intersection2];
		       return intersections;
	        
	   		}
		}
		init();
		return self;
	}
})(jQuery, window, document);
	