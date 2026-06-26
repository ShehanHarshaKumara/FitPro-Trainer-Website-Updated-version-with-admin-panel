@extends('admin.layout')

@section('content')
<div class="top"><div><h1 style="text-transform:capitalize">{{ $type }}</h1><p style="color:#aab4c3">Create, edit, publish, and arrange website content.</p></div><a class="btn" href="{{ route('admin.create', $type) }}">+ Add {{ rtrim($type, 's') }}</a></div>
@if (session('success'))<div class="alert">{{ session('success') }}</div>@endif
<div class="card"><table><thead><tr><th>Item</th><th>Published</th><th></th></tr></thead><tbody>
@if ($items->isEmpty())
  <tr><td colspan="3">No {{ $type }} yet. Add your first one.</td></tr>
@else
  @foreach ($items as $item)
    <tr><td><strong>{{ $item->title ?: 'Untitled image' }}</strong><br><small style="color:#aab4c3">{{ $item->description ? Str::limit($item->description, 70) : ($item->duration ?? '') }}</small></td><td><span class="status">{{ $item->is_published ? 'Live' : 'Draft' }}</span></td><td><a class="btn dark" href="{{ route('admin.edit', [$type, $item->id]) }}">Edit</a> <form style="display:inline" method="POST" action="{{ route('admin.delete', [$type, $item->id]) }}">@csrf @method('DELETE')<button onclick="return confirm('Delete this item?')" style="background:#6b2630">Delete</button></form></td></tr>
  @endforeach
@endif
</tbody></table></div>
@endsection
