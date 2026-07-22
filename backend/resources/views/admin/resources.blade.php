@extends('admin.layout')

@section('content')
@php
  $singular = $type === 'gallery' ? 'gallery item' : rtrim($type, 's');
  $label = $type === 'gallery' ? 'Gallery' : ucfirst($type);
  $resolveImage = fn ($path) => !$path ? null : (Str::startsWith($path, ['http://', 'https://', '/']) ? $path : asset('storage/'.$path));
@endphp
<style>
  .resource-page{--muted:#8d9aad;--surface:#11161d;--surface-2:#0b0f14;--border:#29313b}
  .resource-header{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:22px}.resource-header h1{font-size:32px;letter-spacing:-.04em;margin:0 0 7px}.resource-header p{color:var(--muted);margin:0}.resource-kicker{color:#ff7777;font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px}
  .resource-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:16px}.resource-stat{position:relative;overflow:hidden;padding:17px 18px;background:linear-gradient(145deg,#141a22,#0f141b);border:1px solid var(--border);border-radius:13px}.resource-stat:before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:#ef4444}.resource-stat span{color:var(--muted);font-size:12px}.resource-stat strong{display:block;margin-top:5px;font-size:27px;letter-spacing:-.04em}
  .resource-filters{display:grid;grid-template-columns:minmax(240px,1fr) 190px auto;gap:11px;align-items:end;padding:15px;margin-bottom:16px;background:var(--surface);border:1px solid var(--border);border-radius:13px}.resource-filters label{display:block;margin-bottom:6px}.resource-filters input,.resource-filters select{margin:0}.resource-filter-actions{display:flex;gap:8px}.resource-filter-actions .btn{height:39px;white-space:nowrap}
  .resource-table-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden}.resource-table{width:100%;border-collapse:collapse}.resource-table th{background:#0e1319;color:#7f8da1;font-size:11px;letter-spacing:.08em;padding:14px 16px;text-transform:uppercase;white-space:nowrap}.resource-table td{padding:16px;border-top:1px solid var(--border);vertical-align:middle}.item-main{display:flex;align-items:center;gap:12px;min-width:240px}.item-thumb,.item-icon{width:48px;height:48px;flex:none;border-radius:11px;border:1px solid #343d49;background:linear-gradient(145deg,#3d2025,#191f29);object-fit:cover}.item-icon{display:grid;place-items:center;color:#ff8585;font-size:19px;font-weight:900}.item-copy strong{display:block;margin-bottom:4px}.item-copy small,.muted-cell{color:var(--muted)}.item-copy small{display:block;max-width:330px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.resource-status,.category-badge{display:inline-flex;align-items:center;border:1px solid #354050;border-radius:999px;padding:5px 9px;font-size:11px;font-weight:700;white-space:nowrap}.resource-status.live{border-color:#22c55e66;background:#22c55e1b;color:#86efac}.resource-status.draft{border-color:#f59e0b66;background:#f59e0b1b;color:#fcd34d}.category-badge{color:#c4b5fd;border-color:#7c3aed66;background:#7c3aed1c;text-transform:capitalize}.resource-actions{display:flex;gap:7px;white-space:nowrap}.resource-action{border:1px solid #354050;background:#1b222c;color:#dce4ee;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:700}.resource-action:hover{background:#26303d}.resource-action.edit{border-color:#ef444455;color:#ff9b9b}.resource-action.delete{border-color:#ef444455;background:#ef444414;color:#ff8585}.resource-empty{text-align:center;padding:54px 20px;color:var(--muted)}
  .resource-modal{width:min(650px,calc(100% - 28px));max-height:88vh;padding:0;border:1px solid #36404d;border-radius:16px;background:#11161d;color:#e8edf3;box-shadow:0 30px 90px #000b}.resource-modal::backdrop{background:#020407cc;backdrop-filter:blur(4px)}.resource-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:20px 22px;border-bottom:1px solid var(--border)}.resource-modal-head h2{margin:0 0 4px;font-size:21px}.resource-modal-head p{margin:0;color:var(--muted);font-size:13px}.resource-modal-close{width:34px;height:34px;padding:0;border:1px solid #354050;background:#1b222c;border-radius:9px;font-size:20px;line-height:1}.resource-modal-body{padding:22px;max-height:calc(88vh - 78px);overflow-y:auto}.resource-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.resource-detail{padding:14px;border:1px solid var(--border);background:var(--surface-2);border-radius:10px}.resource-detail.full{grid-column:1/-1}.resource-detail-label{display:block;color:#7f8da1;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px}.resource-detail-value{white-space:pre-wrap;overflow-wrap:anywhere}.resource-modal-image{width:100%;max-height:320px;object-fit:cover;border-radius:11px;border:1px solid var(--border)}.resource-image-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:15px}.resource-image-grid figure{margin:0}.resource-image-grid figcaption{color:var(--muted);font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:6px}.resource-modal-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:18px}.btn-secondary{background:#293241}
  .resource-pagination{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px;padding:12px 14px;background:var(--surface);border:1px solid var(--border);border-radius:11px}.resource-pagination span{color:var(--muted);font-size:12px}.resource-pagination .disabled{opacity:.45;pointer-events:none}
  @media(max-width:900px){.resource-header{align-items:flex-start;flex-direction:column}.resource-filters{grid-template-columns:1fr 1fr}.resource-table-card{overflow-x:auto}.resource-table{min-width:900px}}
  @media(max-width:560px){.resource-header h1{font-size:27px}.resource-stats,.resource-filters{grid-template-columns:1fr}.resource-detail-grid{grid-template-columns:1fr}.resource-detail.full{grid-column:auto}.resource-modal-head,.resource-modal-body{padding:17px}}
</style>

<div class="resource-page">
  <header class="resource-header">
    <div><div class="resource-kicker">Website content</div><h1>{{ $label }} Management</h1><p>Create, review, publish, and maintain your website {{ strtolower($label) }}.</p></div>
    <a class="btn" href="{{ route('admin.create', $type) }}">+ Add {{ ucfirst($singular) }}</a>
  </header>

  @if (session('success'))<div class="alert" role="status">{{ session('success') }}</div>@endif

  <section class="resource-stats" aria-label="{{ $label }} summary">
    <div class="resource-stat"><span>Total items</span><strong>{{ number_format($counts['total']) }}</strong></div>
    <div class="resource-stat"><span>Published</span><strong>{{ number_format($counts['published']) }}</strong></div>
    <div class="resource-stat"><span>Drafts</span><strong>{{ number_format($counts['drafts']) }}</strong></div>
  </section>

  <form class="resource-filters" method="GET" action="{{ route('admin.resources', $type) }}">
    <div><label for="resource-search">Search {{ strtolower($label) }}</label><input id="resource-search" type="search" name="search" value="{{ $filters['search'] }}" placeholder="Search by title or description"></div>
    <div><label for="resource-publication">Publication</label><select id="resource-publication" name="publication"><option value="">All items</option><option value="published" @selected($filters['publication'] === 'published')>Published</option><option value="draft" @selected($filters['publication'] === 'draft')>Drafts</option></select></div>
    <div class="resource-filter-actions"><button class="btn" type="submit">Apply filters</button><a class="btn btn-secondary" href="{{ route('admin.resources', $type) }}">Reset</a></div>
  </form>

  @if ($items->isEmpty())
    <div class="resource-table-card resource-empty"><h2 style="color:#e8edf3;margin-top:0">No {{ strtolower($label) }} found</h2><p>Add your first item or reset the active filters.</p></div>
  @else
    <div class="resource-table-card" role="region" aria-label="{{ $label }} records" tabindex="0"><table class="resource-table">
      <thead><tr><th>Item</th>@if($type === 'packages')<th>Package details</th>@elseif($type === 'gallery')<th>Category</th>@else<th>Service details</th>@endif<th>Publication</th><th>Updated</th><th>Actions</th></tr></thead>
      <tbody>@foreach ($items as $item)
        <tr>
          <td><div class="item-main">
            @if ($item->image)<img class="item-thumb" src="{{ $resolveImage($item->image) }}" alt="">@else<span class="item-icon">{{ strtoupper(substr($item->title ?: $label, 0, 1)) }}</span>@endif
            <div class="item-copy"><strong>{{ $item->title ?: 'Untitled image' }}</strong><small>{{ $item->description ? Str::limit($item->description, 90) : 'No description added' }}</small></div>
          </div></td>
          @if ($type === 'packages')<td><strong>{{ $item->price }}</strong><br><span class="muted-cell">{{ $item->duration }}</span></td>
          @elseif ($type === 'gallery')<td><span class="category-badge">{{ $item->category }}</span></td>
          @else<td><span class="muted-cell">{{ $item->icon ?: 'No icon' }} · {{ count($item->features ?? []) }} features</span></td>@endif
          <td><span class="resource-status {{ $item->is_published ? 'live' : 'draft' }}">{{ $item->is_published ? 'Published' : 'Draft' }}</span></td>
          <td><span class="muted-cell">{{ $item->updated_at->format('d M Y') }}</span></td>
          <td><div class="resource-actions"><button type="button" class="resource-action" aria-haspopup="dialog" aria-controls="view-resource-{{ $item->id }}" onclick="openResourceDialog('view-resource-{{ $item->id }}')">View</button><a class="resource-action edit" href="{{ route('admin.edit', [$type, $item->id]) }}">Edit</a><button type="button" class="resource-action delete" aria-haspopup="dialog" aria-controls="delete-resource-{{ $item->id }}" onclick="openResourceDialog('delete-resource-{{ $item->id }}')">Delete</button></div></td>
        </tr>
      @endforeach</tbody>
    </table></div>

    @if ($items->hasPages())
      <nav class="resource-pagination" aria-label="{{ $label }} pagination"><a class="btn btn-secondary {{ $items->onFirstPage() ? 'disabled' : '' }}" href="{{ $items->previousPageUrl() ?: '#' }}">Previous</a><span>Page {{ $items->currentPage() }} of {{ $items->lastPage() }}</span><a class="btn btn-secondary {{ $items->hasMorePages() ? '' : 'disabled' }}" href="{{ $items->nextPageUrl() ?: '#' }}">Next</a></nav>
    @endif

    @foreach ($items as $item)
        <dialog class="resource-modal" id="view-resource-{{ $item->id }}" aria-labelledby="view-resource-title-{{ $item->id }}">
          <div class="resource-modal-head"><div><h2 id="view-resource-title-{{ $item->id }}">{{ $item->title ?: 'Untitled image' }}</h2><p>{{ ucfirst($singular) }} details</p></div><button class="resource-modal-close" type="button" aria-label="Close" onclick="closeResourceDialog(this)">×</button></div>
          <div class="resource-modal-body">
            @if ($type === 'gallery' && $item->before_image)
              <div class="resource-image-grid"><figure><figcaption>Before</figcaption><img class="resource-modal-image" src="{{ $resolveImage($item->before_image) }}" alt="Before {{ $item->title ?: 'transformation' }}"></figure>@if($item->image)<figure><figcaption>After</figcaption><img class="resource-modal-image" src="{{ $resolveImage($item->image) }}" alt="After {{ $item->title ?: 'transformation' }}"></figure>@endif</div>
            @elseif ($item->image)<img class="resource-modal-image" style="margin-bottom:15px" src="{{ $resolveImage($item->image) }}" alt="{{ $item->title ?: 'Gallery image' }}">@endif
            <div class="resource-detail-grid">
              <div class="resource-detail"><span class="resource-detail-label">Publication</span><div class="resource-detail-value">{{ $item->is_published ? 'Published' : 'Draft' }}</div></div>
              @if ($type === 'services')<div class="resource-detail"><span class="resource-detail-label">Icon</span><div class="resource-detail-value">{{ $item->icon ?: 'Not provided' }}</div></div>@endif
              @if ($type === 'packages')<div class="resource-detail"><span class="resource-detail-label">Price</span><div class="resource-detail-value">{{ $item->price }}</div></div><div class="resource-detail"><span class="resource-detail-label">Duration</span><div class="resource-detail-value">{{ $item->duration }}</div></div>@endif
              @if ($type === 'gallery')<div class="resource-detail"><span class="resource-detail-label">Category</span><div class="resource-detail-value">{{ ucfirst($item->category) }}</div></div>@endif
              <div class="resource-detail full"><span class="resource-detail-label">Description</span><div class="resource-detail-value">{{ $item->description ?: 'No description added' }}</div></div>
              @if (in_array($type, ['services','packages']))<div class="resource-detail full"><span class="resource-detail-label">Features</span><div class="resource-detail-value">{{ ($item->features ?? []) ? implode("\n", $item->features) : 'No features added' }}</div></div>@endif
            </div>
            <div class="resource-modal-actions"><button class="btn btn-secondary" type="button" onclick="closeResourceDialog(this)">Close</button><a class="btn" href="{{ route('admin.edit', [$type, $item->id]) }}">Edit {{ ucfirst($singular) }}</a></div>
          </div>
        </dialog>

        <dialog class="resource-modal" id="delete-resource-{{ $item->id }}" aria-labelledby="delete-resource-title-{{ $item->id }}" style="max-width:460px">
          <div class="resource-modal-head"><div><h2 id="delete-resource-title-{{ $item->id }}">Delete item?</h2><p>This action cannot be undone.</p></div><button class="resource-modal-close" type="button" aria-label="Close" onclick="closeResourceDialog(this)">×</button></div>
          <div class="resource-modal-body"><p style="color:#aab4c3;line-height:1.6;margin-top:0">Permanently delete <strong style="color:#fff">{{ $item->title ?: 'this gallery item' }}</strong>?</p><form method="POST" action="{{ route('admin.delete', [$type, $item->id]) }}">@csrf @method('DELETE')<div class="resource-modal-actions"><button class="btn btn-secondary" type="button" onclick="closeResourceDialog(this)">Cancel</button><button class="btn" type="submit">Delete item</button></div></form></div>
        </dialog>
    @endforeach
  @endif
</div>

<script>
  function openResourceDialog(id) { document.getElementById(id)?.showModal(); }
  function closeResourceDialog(control) { control.closest('dialog')?.close(); }
  document.querySelectorAll('.resource-modal').forEach(function (dialog) { dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); }); });
</script>
@endsection
