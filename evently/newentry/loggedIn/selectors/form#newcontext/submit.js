function() {
  var form = $(this),
    f = form.serializeObject(),
    doc = {
      created_at : new Date(),
      owner : $$("#profile").profile.name,
      title : f.title,
      notes : f.notes,
      type : "context"
    };
  $$(form).app.db.saveDoc(doc, {
    success : function(r) {
    }
  });
  $(':input', form)
  .not(':button, :submit, :reset, :hidden')
  .val('')
  .removeAttr('checked')
  .removeAttr('selected');
  $('#projectselect').find('option:first').attr('selected', 'selected').parent('select');

  // update navigation
  var app = $$(this).app;
  app.db.view("couchapp/projects_and_contexts", {
    success: function(resp)
    {
      $("#nav").trigger("loggedIn", resp);
      $("#newentry").trigger("loggedIn", resp);
    }
  });

  return false;
};
