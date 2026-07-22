@extends('admin.layout')

@section('content')
<style>
  .feedback-page{--muted:#8d9aad;--surface:#11161d;--surface-2:#0b0f14;--border:#29313b;--danger:#ef4444}
  .feedback-header{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:22px}
  .feedback-header h1{font-size:32px;letter-spacing:-.04em;margin:0 0 7px}.feedback-header p{color:var(--muted);margin:0}
  .feedback-kicker{color:#ff7777;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
  .feedback-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:16px}.stat-card{position:relative;overflow:hidden;padding:17px 18px;background:linear-gradient(145deg,#141a22,#0f141b);border:1px solid var(--border);border-radius:13px}.stat-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:#ef4444}.stat-card span{color:var(--muted);font-size:12px}.stat-card strong{display:block;margin-top:5px;font-size:27px;letter-spacing:-.04em}
  .feedback-filters{display:grid;grid-template-columns:minmax(220px,1fr) 180px 180px auto;gap:11px;align-items:end;padding:15px;margin-bottom:16px;background:var(--surface);border:1px solid var(--border);border-radius:13px}.feedback-filters label{display:block;margin-bottom:6px}.feedback-filters input,.feedback-filters select{margin:0}.filter-actions{display:flex;gap:8px}.filter-actions .btn{height:39px;white-space:nowrap}
  .feedback-table-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden}
  .feedback-table{width:100%;border-collapse:collapse}.feedback-table th{background:#0e1319;color:#7f8da1;font-size:11px;letter-spacing:.08em;padding:14px 16px;text-transform:uppercase;white-space:nowrap}.feedback-table td{padding:16px;border-top:1px solid var(--border);vertical-align:middle}
  .person{display:flex;align-items:center;gap:11px;min-width:190px}.avatar{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:linear-gradient(145deg,#3d2025,#191f29);color:#ff8585;font-weight:800}.person strong{display:block}.person small,.date-cell,.message-preview{color:var(--muted)}
  .message-preview{display:block;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.type-badge,.status-badge,.publish-badge{display:inline-flex;align-items:center;gap:6px;border:1px solid #344050;border-radius:999px;padding:5px 9px;font-size:11px;font-weight:700;text-transform:capitalize;white-space:nowrap}.type-badge.testimonial{border-color:#7c3aed66;background:#7c3aed1c;color:#c4b5fd}.type-badge.inquiry{border-color:#0ea5e966;background:#0ea5e91c;color:#7dd3fc}.status-badge.new{border-color:#f59e0b66;background:#f59e0b1b;color:#fcd34d}.status-badge.read{color:#bfdbfe}.status-badge.resolved{border-color:#22c55e66;background:#22c55e1b;color:#86efac}.status-badge.published{border-color:#a855f766;background:#a855f71b;color:#d8b4fe}
  .rating{color:#fbbf24;letter-spacing:1px;white-space:nowrap}.action-group{display:flex;gap:7px;white-space:nowrap}.action-btn{border:1px solid #354050;background:#1b222c;color:#dce4ee;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:700}.action-btn:hover{background:#26303d}.action-btn.edit{border-color:#ef444455;color:#ff9b9b}.action-btn.delete{border-color:#ef444455;background:#ef444414;color:#ff8585}
  .empty-state{text-align:center;padding:54px 20px;color:var(--muted)}
  .alert-error{padding:13px 15px;background:#451a1a;color:#fecaca;border:1px solid #ef444466;border-radius:9px;margin-bottom:16px}.alert-error ul{margin:6px 0 0;padding-left:20px}
  .feedback-modal{width:min(620px,calc(100% - 28px));max-height:88vh;padding:0;border:1px solid #36404d;border-radius:16px;background:#11161d;color:#e8edf3;box-shadow:0 30px 90px #000b}.feedback-modal::backdrop{background:#020407cc;backdrop-filter:blur(4px)}.modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:20px 22px;border-bottom:1px solid var(--border)}.modal-head h2{margin:0 0 4px;font-size:21px}.modal-head p{margin:0;color:var(--muted);font-size:13px}.modal-close{width:34px;height:34px;padding:0;border:1px solid #354050;background:#1b222c;border-radius:9px;font-size:20px;line-height:1}.modal-body{padding:22px;max-height:calc(88vh - 78px);overflow-y:auto}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.detail-block{padding:14px;border:1px solid var(--border);background:var(--surface-2);border-radius:10px}.detail-block.full{grid-column:1/-1}.detail-label{display:block;color:#7f8da1;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px}.detail-value{white-space:pre-wrap;overflow-wrap:anywhere}.edit-form label{display:block;margin-top:2px}.edit-form .inline-check{display:flex;align-items:center;gap:9px;margin:2px 0 16px}.edit-form .inline-check input{width:auto;margin:0}.modal-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:8px}.btn-secondary{background:#293241}
  @media(max-width:900px){.feedback-header{align-items:flex-start;flex-direction:column}.feedback-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.feedback-filters{grid-template-columns:1fr 1fr}.feedback-table-card{overflow-x:auto}.feedback-table{min-width:920px}}
  @media(max-width:560px){.feedback-header h1{font-size:27px}.feedback-stats,.feedback-filters{grid-template-columns:1fr}.detail-grid{grid-template-columns:1fr}.detail-block.full{grid-column:auto}.modal-body,.modal-head{padding:17px}}
</style>

<div class="feedback-page">
  <header class="feedback-header">
    <div>
      <div class="feedback-kicker">Client communication</div>
      <h1>Feedback Management</h1>
      <p>Review enquiries, edit testimonials, and control what appears on your website.</p>
    </div>
  </header>

  @if (session('success'))
    <div class="alert" role="status">{{ session('success') }}</div>
  @endif
  @if ($errors->any())
    <div class="alert-error" role="alert"><strong>Please correct the following:</strong><ul>@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>
  @endif

  <section class="feedback-stats" aria-label="Feedback summary">
    <div class="stat-card"><span>Total feedback</span><strong>{{ number_format($counts['total']) }}</strong></div>
    <div class="stat-card"><span>New feedback</span><strong>{{ number_format($counts['new']) }}</strong></div>
    <div class="stat-card"><span>Testimonials</span><strong>{{ number_format($counts['testimonials']) }}</strong></div>
    <div class="stat-card"><span>Published</span><strong>{{ number_format($counts['published']) }}</strong></div>
  </section>

  <form class="feedback-filters" method="GET" action="{{ route('admin.feedback') }}">
    <div><label for="feedback-search">Search feedback</label><input id="feedback-search" type="search" name="search" value="{{ $filters['search'] }}" placeholder="Name, email, or message"></div>
    <div><label for="feedback-type">Type</label><select id="feedback-type" name="type"><option value="">All types</option><option value="inquiry" @selected($filters['type'] === 'inquiry')>Enquiries</option><option value="testimonial" @selected($filters['type'] === 'testimonial')>Testimonials</option></select></div>
    <div><label for="feedback-status">Status</label><select id="feedback-status" name="status"><option value="">All statuses</option><option value="new" @selected($filters['status'] === 'new')>New</option><option value="read" @selected($filters['status'] === 'read')>Read</option><option value="resolved" @selected($filters['status'] === 'resolved')>Resolved</option><option value="published" @selected($filters['status'] === 'published')>Published</option></select></div>
    <div class="filter-actions"><button class="btn" type="submit">Apply filters</button><a class="btn btn-secondary" href="{{ route('admin.feedback') }}">Reset</a></div>
  </form>

  @if ($items->isEmpty())
    <div class="feedback-table-card empty-state">
      @if (array_filter($filters))
        <h2 style="color:#e8edf3;margin-top:0">No matching feedback</h2><p>Try changing or resetting your filters.</p><a class="btn btn-secondary" href="{{ route('admin.feedback') }}">Reset filters</a>
      @else
        <h2 style="color:#e8edf3;margin-top:0">No feedback yet</h2><p>New enquiries and testimonials will appear here.</p>
      @endif
    </div>
  @else
    <div class="feedback-table-card" role="region" aria-label="Feedback records" tabindex="0">
      <table class="feedback-table">
        <thead><tr><th>Client</th><th>Type</th><th>Message</th><th>Rating</th><th>Status</th><th>Received</th><th>Actions</th></tr></thead>
        <tbody>
        @foreach ($items as $item)
          <tr>
            <td><div class="person"><span class="avatar">{{ strtoupper(substr($item->name, 0, 1)) }}</span><div><strong>{{ $item->name }}</strong><small>{{ $item->email }}</small></div></div></td>
            <td><span class="type-badge {{ $item->type }}">{{ $item->type === 'testimonial' ? 'Testimonial' : 'Enquiry' }}</span></td>
            <td><span class="message-preview" title="{{ $item->message }}">{{ $item->message }}</span></td>
            <td><span class="rating">{{ $item->rating ? str_repeat('★', $item->rating) : '—' }}</span></td>
            <td><span class="status-badge {{ $item->status }}">{{ $item->status }}</span></td>
            <td><span class="date-cell">{{ $item->created_at->format('d M Y') }}</span></td>
            <td><div class="action-group">
              <button type="button" class="action-btn" onclick="openFeedbackDialog('view-feedback-{{ $item->id }}')">View</button>
              <button type="button" class="action-btn edit" onclick="openFeedbackDialog('edit-feedback-{{ $item->id }}')">Edit</button>
              <button type="button" class="action-btn delete" onclick="openFeedbackDialog('delete-feedback-{{ $item->id }}')">Delete</button>
            </div></td>
          </tr>

          <dialog class="feedback-modal" id="view-feedback-{{ $item->id }}">
            <div class="modal-head"><div><h2>{{ $item->name }}</h2><p>Feedback details</p></div><button type="button" class="modal-close" aria-label="Close" onclick="closeFeedbackDialog(this)">×</button></div>
            <div class="modal-body"><div class="detail-grid">
              <div class="detail-block"><span class="detail-label">Email</span><div class="detail-value">{{ $item->email }}</div></div>
              <div class="detail-block"><span class="detail-label">Phone</span><div class="detail-value">{{ $item->phone ?: 'Not provided' }}</div></div>
              <div class="detail-block"><span class="detail-label">Type</span><div class="detail-value">{{ $item->type === 'testimonial' ? 'Client testimonial' : 'Website enquiry' }}</div></div>
              <div class="detail-block"><span class="detail-label">Received</span><div class="detail-value">{{ $item->created_at->format('d M Y, H:i') }}</div></div>
              @if ($item->type === 'testimonial')
                <div class="detail-block"><span class="detail-label">Program / goal</span><div class="detail-value">{{ $item->role ?: 'Not provided' }}</div></div>
                <div class="detail-block"><span class="detail-label">Rating</span><div class="detail-value rating">{{ $item->rating ? str_repeat('★', $item->rating) : 'Not rated' }}</div></div>
                <div class="detail-block full"><span class="detail-label">Result</span><div class="detail-value">{{ $item->result ?: 'Not provided' }}</div></div>
              @endif
              <div class="detail-block full"><span class="detail-label">Message</span><div class="detail-value">{{ $item->message }}</div></div>
              <div class="detail-block full"><span class="detail-label">Private admin notes</span><div class="detail-value">{{ $item->admin_notes ?: 'No notes added' }}</div></div>
            </div></div>
          </dialog>

          <dialog class="feedback-modal" id="edit-feedback-{{ $item->id }}">
            <div class="modal-head"><div><h2>Edit feedback</h2><p>{{ $item->name }} · {{ $item->email }}</p></div><button type="button" class="modal-close" aria-label="Close" onclick="closeFeedbackDialog(this)">×</button></div>
            <div class="modal-body"><form class="edit-form" method="POST" action="{{ route('admin.feedback.update', $item) }}">@csrf @method('PUT')<input type="hidden" name="feedback_id" value="{{ $item->id }}">
              @if ($item->type === 'testimonial')
                <label for="role-{{ $item->id }}">Program / goal</label><input id="role-{{ $item->id }}" name="role" value="{{ $item->role }}">
                <label for="rating-{{ $item->id }}">Rating</label><select id="rating-{{ $item->id }}" name="rating">@for ($rating = 1; $rating <= 5; $rating++)<option value="{{ $rating }}" @selected($item->rating === $rating)>{{ $rating }} stars</option>@endfor</select>
                <label for="result-{{ $item->id }}">Result</label><input id="result-{{ $item->id }}" name="result" value="{{ $item->result }}">
                <label for="message-{{ $item->id }}">Testimonial</label><textarea id="message-{{ $item->id }}" name="message" rows="5">{{ $item->message }}</textarea>
                <label class="inline-check"><input type="checkbox" name="is_published" value="1" @checked($item->is_published)> Show on website</label>
              @else
                <div class="detail-block" style="margin-bottom:16px"><span class="detail-label">Message</span><div class="detail-value">{{ $item->message }}</div></div>
              @endif
              <label for="status-{{ $item->id }}">Status</label><select id="status-{{ $item->id }}" name="status"><option value="new" @selected($item->status === 'new')>New</option><option value="read" @selected($item->status === 'read')>Read</option><option value="resolved" @selected($item->status === 'resolved')>Resolved</option><option value="published" @selected($item->status === 'published')>Published</option></select>
              <label for="notes-{{ $item->id }}">Private admin notes</label><textarea id="notes-{{ $item->id }}" name="admin_notes" rows="3">{{ $item->admin_notes }}</textarea>
              <div class="modal-actions"><button type="button" class="btn btn-secondary" onclick="closeFeedbackDialog(this)">Cancel</button><button type="submit" class="btn">Save changes</button></div>
            </form></div>
          </dialog>

          <dialog class="feedback-modal" id="delete-feedback-{{ $item->id }}" style="max-width:460px">
            <div class="modal-head"><div><h2>Delete feedback?</h2><p>This action cannot be undone.</p></div><button type="button" class="modal-close" aria-label="Close" onclick="closeFeedbackDialog(this)">×</button></div>
            <div class="modal-body">
              <p style="color:#aab4c3;line-height:1.6;margin-top:0">You are about to permanently delete the feedback from <strong style="color:#fff">{{ $item->name }}</strong>.</p>
              <form method="POST" action="{{ route('admin.feedback.delete', $item) }}">@csrf @method('DELETE')
                <div class="modal-actions"><button type="button" class="btn btn-secondary" onclick="closeFeedbackDialog(this)">Cancel</button><button type="submit" class="btn">Delete feedback</button></div>
              </form>
            </div>
          </dialog>
        @endforeach
        </tbody>
      </table>
    </div>
  @endif
</div>

<script>
  function openFeedbackDialog(id) { document.getElementById(id)?.showModal(); }
  function closeFeedbackDialog(control) { control.closest('dialog')?.close(); }
  document.querySelectorAll('.feedback-modal').forEach(function (dialog) {
    dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  });
  @if ($errors->any() && old('feedback_id'))
    openFeedbackDialog('edit-feedback-{{ old('feedback_id') }}');
  @endif
</script>
@endsection
