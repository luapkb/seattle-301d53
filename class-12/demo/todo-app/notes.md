   <fieldset>
      <legend>Update A Task</legend>
      <input type="text" name="title" value="<%-task.title%>" placeholder="Task Name">
      <textarea name="description" placeholder="Description of the task" cols="30" rows="10"><%= task.description %></textarea>
      <input type="text" name="category" value="<%-task.category%>" placeholder="Category">
      <input type="text" name="contact" value="<%-task.contact%>" placeholder="Contact Person">
      <input type="text" name="status" value="<%-task.status%>" placeholder="Completion Status">
      <button type="submit">Update This Task</button>
    </fieldset>