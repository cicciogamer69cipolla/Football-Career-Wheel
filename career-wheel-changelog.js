/* The complete release history lives in Messages; the wheel keeps its space. */
(() => {
  'use strict';
  const copy = {
    it: {news:'Novità',version:'Versione',updated:'Ultimo aggiornamento',open:'Apri le novità e la cronologia degli aggiornamenti',details:'Dettagli della versione',back:'Tutte le versioni',search:'Cerca nella cronologia',placeholder:'Versione, ruote, carte, obiettivi…',note:'Tutte le modifiche dall’inizio. Le prime patch sono raccolte per fase; le date non registrate restano indicate come tali.',unknown:'Data non registrata',empty:'Nessun aggiornamento trovato.',results:n=>`${n} ${n===1?'voce':'voci'} nello storico`,detailHint:'Tutte le novità e le correzioni di questa versione.',listHint:'La storia di Career Wheel, dalle prime ruote a oggi.'},
    en: {news:'What’s new',version:'Version',updated:'Last update',open:'Open news and release history',details:'Version details',back:'All versions',search:'Search the release history',placeholder:'Version, wheels, cards, objectives…',note:'Every change since the beginning. Early patches are grouped by phase; unrecorded dates are marked as such.',unknown:'Date not recorded',empty:'No matching updates.',results:n=>`${n} release ${n===1?'entry':'entries'}`,detailHint:'All additions and fixes in this release.',listHint:'The history of Career Wheel, from the first wheels to today.'},
    es: {news:'Novedades',version:'Versión',updated:'Última actualización',open:'Abrir novedades e historial de actualizaciones',details:'Detalles de la versión',back:'Todas las versiones',search:'Buscar en el historial',placeholder:'Versión, ruletas, cartas, objetivos…',note:'Todos los cambios desde el inicio. Las primeras actualizaciones se agrupan por etapa; las fechas no registradas se indican como tales.',unknown:'Fecha no registrada',empty:'No se han encontrado actualizaciones.',results:n=>`${n} ${n===1?'entrada':'entradas'} en el historial`,detailHint:'Todas las novedades y correcciones de esta versión.',listHint:'La historia de Career Wheel, desde las primeras ruletas hasta hoy.'},
    fr: {news:'Nouveautés',version:'Version',updated:'Dernière mise à jour',open:'Ouvrir les nouveautés et l’historique des mises à jour',details:'Détails de la version',back:'Toutes les versions',search:'Rechercher dans l’historique',placeholder:'Version, roues, cartes, objectifs…',note:'Tous les changements depuis le début. Les premières mises à jour sont regroupées par étape ; les dates non enregistrées sont indiquées comme telles.',unknown:'Date non enregistrée',empty:'Aucune mise à jour trouvée.',results:n=>`${n} ${n===1?'entrée':'entrées'} dans l’historique`,detailHint:'Toutes les nouveautés et corrections de cette version.',listHint:'L’histoire de Career Wheel, des premières roues à aujourd’hui.'}
  };
  const locales = {it:'it-IT',en:'en-GB',es:'es-ES',fr:'fr-FR'};
  const language = () => copy[document.documentElement.lang] ? document.documentElement.lang : 'it';
  const words = () => copy[language()];
  const history = () => window.fcwReleaseHistory?.[language()] || window.fcwReleaseHistory?.it || [];
  const make = (tag, className='', text) => {const node=document.createElement(tag);node.className=className;if(text!==undefined)node.textContent=text;return node;};
  const fold = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const dateText = (date, compact=false) => date ? new Intl.DateTimeFormat(locales[language()],{day:'2-digit',month:'2-digit',...(compact?{}:{year:'numeric'}),timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`)) : words().unknown;
  let host, root, overview, searchLabel, search, note, count, list, empty, detail, activeId='', query='', overviewScroll=0, metadata, helpButton, updated, lastListSignature='', lastDetailSignature='';
  function mountMetadata() {
    if(metadata)return;
    const version=document.getElementById('siteVersion'),hero=document.querySelector('.hero');
    if(!version||!hero)return;
    metadata=make('div','cw-release-meta');metadata.id='cwReleaseMeta';
    const row=make('div','cw-release-version-row');helpButton=make('button','cw-release-help','?');helpButton.id='cwReleaseHistoryOpen';helpButton.type='button';
    helpButton.setAttribute('aria-haspopup','dialog');helpButton.setAttribute('aria-controls','cwHubDialog');
    helpButton.addEventListener('click',()=>{showOverview(false);window.fcwNavigation?.open('messages');});
    updated=make('p','cw-release-updated');updated.id='cwReleaseUpdated';row.append(version,helpButton);metadata.append(row,updated);hero.after(metadata);
  }
  function scrollArea() {return host?.closest('.cw-hub-content');}
  function labelHub() {
    const dialog=document.getElementById('cwHubDialog');
    if(!dialog||!host||host.hidden)return;
    const title=document.getElementById('cwHubTitle'),intro=document.getElementById('cwHubIntro');
    if(title)title.textContent=words().news;
    if(intro)intro.textContent=activeId?words().detailHint:words().listHint;
  }
  function buildCard(release) {
    const article=make('article','cw-release-card');article.dataset.releaseId=release.id;
    const head=make('div','cw-release-card-head'),meta=make('div','cw-release-card-meta');
    const version=make('h3','cw-release-version',`v${release.version}`);version.id=`cwRelease-${release.id}`;
    const date=make('p','cw-release-date',dateText(release.date));meta.append(version,date);
    const button=make('button','cw-release-details','?');button.type='button';button.dataset.releaseDetails=release.id;
    button.setAttribute('aria-label',`${words().details} ${release.version}`);button.setAttribute('aria-controls','cwReleaseDetail');
    button.addEventListener('click',()=>showDetails(release.id));head.append(meta,button);
    article.append(head,make('h4','cw-release-title',release.title),make('p','cw-release-summary',release.summary));
    return article;
  }
  function renderList() {
    if(!list)return;
    const signature=`${language()}\0${query}`;
    if(signature===lastListSignature)return;
    lastListSignature=signature;
    const normalized=fold(query).trim();
    const entries=history().filter(release=>!normalized||fold([release.version,release.title,release.summary,...release.sections.flatMap(section=>[section.title,...section.items])].join(' ')).includes(normalized));
    list.replaceChildren(...entries.map(buildCard));empty.hidden=entries.length>0;empty.textContent=words().empty;count.textContent=words().results(entries.length);
  }
  function renderDetail() {
    if(!detail)return;
    const signature=`${language()}\0${activeId}`;
    if(signature===lastDetailSignature)return;
    lastDetailSignature=signature;
    const release=history().find(item=>item.id===activeId);
    if(!release){activeId='';overview.hidden=false;detail.hidden=true;return;}
    const back=make('button','cw-release-back',`← ${words().back}`);back.type='button';back.id='cwReleaseBack';back.addEventListener('click',()=>showOverview(true));
    const title=make('h3','cw-release-detail-title',`${words().version} ${release.version}`);title.id='cwReleaseDetailTitle';title.tabIndex=-1;
    detail.setAttribute('aria-labelledby',title.id);
    detail.replaceChildren(back,make('p','cw-release-kicker',words().news),title,make('p','cw-release-date',dateText(release.date)),make('p','cw-release-summary',release.title));
    release.sections.forEach(section=>{
      const group=make('section','cw-release-section'),heading=make('h4','',section.title),items=make('ul','cw-release-items');
      items.append(...section.items.map(text=>make('li','',text)));group.append(heading,items);detail.append(group);
    });
  }
  function showDetails(id) {
    if(!history().some(item=>item.id===id))return;
    overviewScroll=scrollArea()?.scrollTop||0;activeId=id;overview.hidden=true;detail.hidden=false;renderDetail();labelHub();
    if(scrollArea())scrollArea().scrollTop=0;detail.querySelector('h3')?.focus({preventScroll:true});
  }
  function showOverview(restoreFocus=false) {
    const previous=activeId;activeId='';if(!overview)return;overview.hidden=false;detail.hidden=true;labelHub();
    if(scrollArea())scrollArea().scrollTop=restoreFocus?overviewScroll:0;
    if(restoreFocus)list.querySelector(`[data-release-details="${previous}"]`)?.focus({preventScroll:true});
  }
  function render() {
    mountMetadata();
    if(metadata){
      const latest=history()[0];helpButton.title=words().open;helpButton.setAttribute('aria-label',words().open);
      updated.textContent=`${words().updated}: ${dateText(latest?.date,true)}`;
      updated.setAttribute('aria-label',`${words().updated}: ${dateText(latest?.date)}`);
    }
    if(!root)return;
    searchLabel.textContent=words().search;search.placeholder=words().placeholder;note.textContent=words().note;
    renderList();if(activeId)renderDetail();labelHub();
  }
  function mount(node) {
    if(host===node){render();return;}
    host=node;lastListSignature='';lastDetailSignature='';root=make('div','cw-changelog');root.id='cwChangelog';overview=make('section');overview.id='cwReleaseOverview';
    const tools=make('div','cw-changelog-tools'),label=make('label');searchLabel=make('span');search=make('input');search.type='search';search.id='cwReleaseSearch';search.autocomplete='off';search.value=query;
    search.addEventListener('input',()=>{query=search.value;renderList();});label.append(searchLabel,search);tools.append(label);
    note=make('p','cw-changelog-note');count=make('p','cw-release-count');count.setAttribute('role','status');count.setAttribute('aria-live','polite');
    list=make('div','cw-release-list');empty=make('p','cw-muted');detail=make('section','cw-release-detail');detail.id='cwReleaseDetail';detail.hidden=true;
    overview.append(tools,note,count,list,empty);root.append(overview,detail);node.replaceChildren(root);
    document.getElementById('cwNav-messages')?.addEventListener('click',()=>showOverview(false));
    document.getElementById('cwHubDialog')?.addEventListener('close',()=>showOverview(false));
    render();
  }
  window.fcwChangelog={mount,render};
  window.addEventListener('fcw:language',render);
  document.getElementById('languageSelect')?.addEventListener('change',()=>queueMicrotask(render));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
