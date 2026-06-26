@extends('admin.layout')

@section('content')
<div class="top"><div><h1>Feedback & testimonials</h1><p style="color:#aab4c3">Manage client enquiries and published success stories.</p></div></div>
@if (session('success'))<div class="alert">{{ session('success') }}</div>@endif
@if ($items->isEmpty())
  <div class="card">No feedback yet.</div>
@else
  @foreach ($items as $item)
    <div class="card" style="margin-bottom:14px">
      <div class="top" style="margin-bottom:8px"><div><strong>{{ $item->name }}</strong> · {{ $item->email }}<br><small style="color:#aab4c3">{{ $item->type === 'testimonial' ? 'Client testimonial' : 'Website enquiry' }} · {{ $item->created_at->format('d M Y, H:i') }}</small></div><span class="status">{{ $item->status }}</span></div>
      <form method="POST" action="{{ route('admin.feedback.update', $item) }}">@csrf @method('PUT')
        @if ($item->type === 'testimonial')
          <label>Program / goal</label><input name="role" value="{{ $item->role }}">
          <label>Rating</label><select name="rating">@for ($rating = 1; $rating <= 5; $rating++)<option value="{{ $rating }}" @selected($item->rating === $rating)>{{ $rating }} stars</option>@endfor</select>
          <label>Result</label><input name="result" value="{{ $item->result }}">
          <label>Testimonial</label><textarea name="message" rows="4">{{ $item->message }}</textarea>
          <label><input style="width:auto" type="checkbox" name="is_published" value="1" @checked($item->is_published)> Show on website</label><br>
        @else
          <p>{{ $item->message }}</p>
        @endif
        <label>Status</label><select name="status"><option value="new" @selected($item->status === 'new')>new</option><option value="read" @selected($item->status === 'read')>read</option><option value="resolved" @selected($item->status === 'resolved')>resolved</option><option value="published" @selected($item->status === 'published')>published</option></select>
        <label>Private admin notes</label><textarea name="admin_notes" rows="2">{{ $item->admin_notes }}</textarea><button>Save changes</button>
      </form>
    </div>
  @endforeach
@endif
@endsection
