function initFilters( elList, strClass, onPreFilterCheck, onPostFilterCheck ){
  elList.before("<div class='" + strClass + "'><label>Filter</label><div class='" + strClass + "__options'></div><button class='" + strClass + "__btn'>GO</button></div>")
  var $items = elList.children(),
    arrFilters = []

  $items.each(function(){
    var objData = $(this).data()
    for (var key in objData) {
      if ( key.includes("filter") && (!arrFilters.includes(key)) && key != "" ){
        arrFilters.push(key)
      }
    }
  })
  for (var i = 0; i < arrFilters.length; i++) {
    var eachFilter = arrFilters[i],
    arrFilterOptions = []
    $('.' + strClass + '__options').prepend("<select class='" + strClass + "__select " + strClass + "__select--" + eachFilter + "' data-filter='" + eachFilter + "'><option value=''>Select " + eachFilter.replace("filter", "").replace("_", " ") + "</option><option value=''>All</option></select>")
    $items.each(function(){
      var strFilterVal = $(this).attr('data-' + eachFilter)
      if ( !arrFilterOptions.includes(strFilterVal) && strFilterVal != undefined ){
        arrFilterOptions.push(strFilterVal)
      }
    })
    for (var j = 0; j < arrFilterOptions.length; j++) {
      var strOptionVal = arrFilterOptions[j]
      strOptionVal != "" && $("." + strClass + "__select--" + eachFilter).append("<option value='" + arrFilterOptions[j] + "'>" + arrFilterOptions[j] + "</option>")
    } 
  }

  $("." + strClass + "__btn").on("click", function(){
    onPreFilterCheck(function(){
      runFilterCheck(function(){
        onPostFilterCheck()
      })
    })
  })
  onPostFilterCheck()

  function runFilterCheck(callback){
    $items.hide().removeClass('active')
    $("." + strClass + "__error").remove()
    var strDataFilters = "";
    $("." + strClass + "__select").each(function(){
      var strVal = $(this).val()
      strVal != "" && (strDataFilters += "[data-" + $(this).attr('data-filter') + "='" + strVal + "']")
    })
    elList.children(strDataFilters).show().addClass('active')
    if (!elList.children('.active').length){
      elList.after("<div class='" + strClass + "__error ms-pad center'><p>Sorry, your search returned no results.</p></div>")
    }
    callback()
  }
}

initFilters( $('.list'), "filter", function(callback){
  callback()
}, function(){})
