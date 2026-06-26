@extends('admin.layout')

@section('content')
<div class="top">
  <h1>{{ $item ? 'Edit' : 'Add' }} {{ rtrim($type, 's') }}</h1>
  <a class="btn dark" href="{{ route('admin.resources', $type) }}">Back</a>
</div>

<div class="card">
  @if ($errors->any())
    <div class="alert" style="background:#4a1f25;color:#fecaca">{{ $errors->first() }}</div>
  @endif

  <form method="POST" enctype="multipart/form-data" action="{{ $item ? route('admin.update', [$type, $item->id]) : route('admin.store', $type) }}">
    @csrf
    @if ($item)
      @method('PUT')
    @endif

    <label>Title</label>
    <input name="title" value="{{ old('title', $item->title ?? '') }}" @if ($type !== 'gallery') required @endif>

    @if ($type === 'packages')
      <label>Duration</label>
      <input name="duration" value="{{ old('duration', $item->duration ?? '') }}" required>
      <label>Price</label>
      <input name="price" value="{{ old('price', $item->price ?? '') }}" required>
    @endif

    @if ($type === 'services')
      <label>Icon name (optional)</label>
      <input name="icon" value="{{ old('icon', $item->icon ?? '') }}" placeholder="dumbbell">
    @endif

    @if ($type === 'gallery')
      <label>Category</label>
      <select name="category">
        <option value="training" @selected(old('category', $item->category ?? '') === 'training')>Training image</option>
        <option value="transformation" @selected(old('category', $item->category ?? '') === 'transformation')>Before / after transformation</option>
      </select>
    @endif

    <label>Description</label>
    <textarea name="description" rows="5">{{ old('description', $item->description ?? '') }}</textarea>

    @if (in_array($type, ['services', 'packages']))
      <label>Features (one per line)</label>
      <textarea name="features_text" rows="6">{{ old('features_text', isset($item) ? implode("\n", $item->features ?? []) : '') }}</textarea>
    @endif

    <label>{{ $type === 'gallery' ? 'After image' : 'Image' }}</label>
    <input name="image" type="file" accept="image/*">

    @if ($type === 'gallery')
      <label>Before image (only for transformations)</label>
      <input name="before_image" type="file" accept="image/*">
    @endif

    <label><input style="width:auto" type="checkbox" name="is_published" value="1" @checked(old('is_published', $item->is_published ?? true))> Published on website</label>
    <br>
    <button style="margin-top:18px">Save {{ rtrim($type, 's') }}</button>
  </form>
</div>
@endsection
