@extends('admin.layout')

@section('content')
@php
  $singular = $type === 'gallery' ? 'Gallery Item' : ucfirst(rtrim($type, 's'));
  $isEditing = (bool) $item;
  $resolveImage = fn ($path) => !$path ? null : (Str::startsWith($path, ['http://', 'https://', '/']) ? $path : asset('storage/'.$path));
@endphp
<style>
  .editor-page{--muted:#8d9aad;--surface:#11161d;--surface-2:#0b0f14;--border:#29313b}
  .editor-header{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:22px}.editor-header h1{font-size:32px;letter-spacing:-.04em;margin:0 0 7px}.editor-header p{color:var(--muted);margin:0}.editor-kicker{color:#ff7777;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
  .editor-layout{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(290px,.65fr);gap:17px;align-items:start}.editor-column{display:grid;gap:17px}.editor-card{background:var(--surface);border:1px solid var(--border);border-radius:15px;padding:22px}.editor-card-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:19px;padding-bottom:16px;border-bottom:1px solid var(--border)}.editor-step{display:grid;place-items:center;width:31px;height:31px;flex:none;border-radius:9px;background:#ef44441a;border:1px solid #ef444455;color:#ff8585;font-weight:800}.editor-card h2{font-size:17px;margin:0 0 4px}.editor-card-head p{color:var(--muted);font-size:12px;margin:0}.editor-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 14px}.editor-field.full{grid-column:1/-1}.editor-field label{display:block;margin-bottom:1px}.editor-field input,.editor-field textarea,.editor-field select{margin-bottom:15px}.field-help{display:block;color:#6f7d91;font-size:11px;margin:-9px 0 15px}.editor-upload{padding:18px;border:1px dashed #3a4655;border-radius:11px;background:var(--surface-2)}.editor-upload input{margin-bottom:4px}.current-image{width:100%;max-height:220px;object-fit:cover;border-radius:10px;border:1px solid var(--border);margin-bottom:15px}.publish-control{display:flex;align-items:flex-start;gap:11px;padding:14px;border:1px solid var(--border);border-radius:10px;background:var(--surface-2);cursor:pointer}.publish-control input{width:auto;margin:3px 0 0}.publish-control strong{display:block;color:#e8edf3;font-size:13px;margin-bottom:3px}.publish-control span{display:block;color:var(--muted);font-size:12px;line-height:1.45}.editor-actions{display:flex;justify-content:flex-end;gap:9px}.btn-secondary{background:#293241}.editor-error{padding:14px 16px;background:#451a1a;border:1px solid #ef444466;color:#fecaca;border-radius:10px;margin-bottom:17px}.editor-error ul{margin:7px 0 0;padding-left:20px}
  @media(max-width:900px){.editor-layout{grid-template-columns:1fr}.editor-header{align-items:flex-start;flex-direction:column}}
  @media(max-width:560px){.editor-header h1{font-size:27px}.editor-card{padding:17px}.editor-grid{grid-template-columns:1fr}.editor-field.full{grid-column:auto}.editor-actions{flex-direction:column-reverse}.editor-actions .btn{text-align:center;width:100%}}
</style>

<div class="editor-page">
  <header class="editor-header">
    <div><div class="editor-kicker">{{ $isEditing ? 'Update website content' : 'Add website content' }}</div><h1>{{ $isEditing ? 'Edit' : 'Create' }} {{ $singular }}</h1><p>{{ $isEditing ? 'Review the details below and save your changes.' : 'Complete the details below to add new website content.' }}</p></div>
    <a class="btn btn-secondary" href="{{ route('admin.resources', $type) }}">← Back to {{ $type === 'gallery' ? 'Gallery' : ucfirst($type) }}</a>
  </header>

  @if ($errors->any())<div class="editor-error" role="alert"><strong>Please correct the following:</strong><ul>@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>@endif

  <form method="POST" enctype="multipart/form-data" action="{{ $item ? route('admin.update', [$type, $item->id]) : route('admin.store', $type) }}">
    @csrf @if ($item) @method('PUT') @endif
    <div class="editor-layout">
      <div class="editor-column">
        <section class="editor-card">
          <div class="editor-card-head"><span class="editor-step">1</span><div><h2>{{ $type === 'packages' ? 'Package details' : ($type === 'services' ? 'Service details' : 'Gallery details') }}</h2><p>Set the main information visitors will see.</p></div></div>
          <div class="editor-grid">
            <div class="editor-field full"><label for="resource-title">Title</label><input id="resource-title" name="title" value="{{ old('title', $item->title ?? '') }}" placeholder="Enter a clear title" @if ($type !== 'gallery') required @endif></div>
            @if ($type === 'packages')
              <div class="editor-field"><label for="resource-duration">Duration</label><input id="resource-duration" name="duration" value="{{ old('duration', $item->duration ?? '') }}" placeholder="Example: 12 weeks" required></div>
              <div class="editor-field"><label for="resource-price">Price</label><input id="resource-price" name="price" value="{{ old('price', $item->price ?? '') }}" placeholder="Example: LKR 25,000" required></div>
            @elseif ($type === 'services')
              <div class="editor-field full"><label for="resource-icon">Icon name</label><input id="resource-icon" name="icon" value="{{ old('icon', $item->icon ?? '') }}" placeholder="Example: dumbbell"><small class="field-help">Optional icon identifier used by the website.</small></div>
            @else
              <div class="editor-field full"><label for="resource-category">Category</label><select id="resource-category" name="category"><option value="training" @selected(old('category', $item->category ?? 'training') === 'training')>Training image</option><option value="transformation" @selected(old('category', $item->category ?? '') === 'transformation')>Before / after transformation</option></select></div>
            @endif
          </div>
        </section>

        <section class="editor-card">
          <div class="editor-card-head"><span class="editor-step">2</span><div><h2>Content and features</h2><p>Describe the item and highlight what is included.</p></div></div>
          <div class="editor-field"><label for="resource-description">Description</label><textarea id="resource-description" name="description" rows="6" placeholder="Write a useful description for website visitors">{{ old('description', $item->description ?? '') }}</textarea></div>
          @if (in_array($type, ['services', 'packages']))
            <div class="editor-field"><label for="resource-features">Features</label><textarea id="resource-features" name="features_text" rows="7" placeholder="One feature per line">{{ old('features_text', isset($item) ? implode("\n", $item->features ?? []) : '') }}</textarea><small class="field-help">Add one feature per line.</small></div>
          @else
            <p style="color:var(--muted);margin:0">Gallery descriptions are optional but help explain the training session or transformation.</p>
          @endif
        </section>
      </div>

      <aside class="editor-column">
        <section class="editor-card">
          <div class="editor-card-head"><span class="editor-step">3</span><div><h2>Media and publication</h2><p>Upload imagery and control website visibility.</p></div></div>
          @if ($item?->image)<img class="current-image" src="{{ $resolveImage($item->image) }}" alt="Current image">@endif
          <div class="editor-upload"><label for="resource-image">{{ $type === 'gallery' ? 'After image' : 'Featured image' }}</label><input id="resource-image" name="image" type="file" accept="image/*"><small class="field-help" style="margin:5px 0 0">PNG, JPG, or WebP up to 5 MB.</small></div>
          @if ($type === 'gallery')
            <div class="editor-upload" style="margin-top:13px">@if ($item?->before_image)<img class="current-image" src="{{ $resolveImage($item->before_image) }}" alt="Current before image">@endif<label for="resource-before-image">Before image</label><input id="resource-before-image" name="before_image" type="file" accept="image/*"><small class="field-help" style="margin:5px 0 0">Used for transformation comparisons.</small></div>
          @endif
          <input type="hidden" name="is_published" value="0">
          <label class="publish-control" style="margin-top:16px"><input type="checkbox" name="is_published" value="1" @checked((bool) old('is_published', $item->is_published ?? true))><span><strong>Published on website</strong><span>Turn this off to save the item as a draft.</span></span></label>
        </section>
        <div class="editor-actions"><a class="btn btn-secondary" href="{{ route('admin.resources', $type) }}">Cancel</a><button class="btn" type="submit">Save {{ $singular }}</button></div>
      </aside>
    </div>
  </form>
</div>
@endsection
