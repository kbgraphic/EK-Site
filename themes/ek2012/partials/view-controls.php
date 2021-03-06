		<ul class="unstyled" id="view-controls" data-nonce="<?php echo wp_create_nonce('ek_load_posts') ?>">
			<li id="list-view" class="<!--mfunc <?php echo W3TC_DYNAMIC_SECURITY ?> echo ( ! isset($_COOKIE['viewMode']) || $_COOKIE['viewMode'] == 'list') ? 'active' : ''; --><?php echo ( ! isset($_COOKIE['viewMode']) || $_COOKIE['viewMode'] == 'list') ? 'active' : ''; ?><!--/mfunc <?php echo W3TC_DYNAMIC_SECURITY ?> -->"><a href="javascript:void(0)" data-action="listView" class="">List View</a></li>
			<li id="grid-view" class="<!--mfunc <?php echo W3TC_DYNAMIC_SECURITY ?> echo isset($_COOKIE['viewMode']) && $_COOKIE['viewMode'] == 'grid' ? 'active' : ''; --><?php echo isset($_COOKIE['viewMode']) && $_COOKIE['viewMode'] == 'grid' ? 'active' : ''; ?><!--/mfunc <?php echo W3TC_DYNAMIC_SECURITY ?> -->"><a href="javascript:void(0)" data-action="gridView" class="">Grid View</a></li>
			<?php if (is_home()) : ?>
			<li id="cat-filter"><a href="javascript:void(0)" data-action="showCatFilters" class="">Filter By Category</a></li>
			<?php endif; ?>
			<li id="sfw-filter" class="<?php global $wp_query; echo isset($wp_query->query_vars['sfw']) ? 'checked' : '' ?>" data-nsfw_tagid="<?php echo get_term_by('slug', 'nsfw', 'post_tag')->term_id ?>"><a href="javascript:void(0)" data-action="filterSfw" class="">SFW</a></li>
		</ul> <!-- /#view-controls -->
		<?php if (is_home()) : ?>
		<div id="cat-filters" class="well clearfix">
			<a id="close-cat-filters" href="javascript:void(0)"></a>
			<h3>Select specific categories you want to view.</h3>
			<div class="row">
				<div class="span2 illustration-art">
					<h5>Illustration &amp; Art</h5>
					<ul class="cat-filter illustration-art unstyled">
						<?php $cats = get_categories(array('child_of' => 4)); ?>
						<?php foreach ($cats as $cat) : ?>
						<li data-cat_id="<?php echo $cat->term_id ?>"><a href="javascript:void(0)"><span class="check"></span><?php echo $cat->name ?></a></li>
						<?php endforeach; ?>
					</ul> <!-- /.cat-filter.illustration -->
				</div> <!-- .span2 -->
				<div class="span2 photography">
					<h5>Photography</h5>
					<ul class="cat-filter photography unstyled">
						<?php $cats = get_categories(array('child_of' => 6)); ?>
						<?php foreach ($cats as $cat) : ?>
						<li data-cat_id="<?php echo $cat->term_id ?>"><a href="javascript:void(0)"><span class="check"></span><?php echo $cat->name ?></a></li>
						<?php endforeach; ?>
					</ul> <!-- /.cat-filter.photography -->
				</div> <!-- .span2 -->
				<div class="span2 film">
					<h5>Film</h5>
					<ul class="cat-filter film unstyled">
						<?php $cats = get_categories(array('child_of' => 3)); ?>
						<?php foreach ($cats as $cat) : ?>
						<li data-cat_id="<?php echo $cat->term_id ?>"><a href="javascript:void(0)"><span class="check"></span><?php echo $cat->name ?></a></li>
						<?php endforeach; ?>
					</ul> <!-- /.cat-filter.film -->
				</div> <!-- .span2 -->
				<div class="span2 new-media">
					<h5>New Media</h5>
					<ul class="cat-filter new-media unstyled">
						<?php $cats = get_categories(array('child_of' => 5)); ?>
						<?php foreach ($cats as $cat) : ?>
						<li data-cat_id="<?php echo $cat->term_id ?>"><a href="javascript:void(0)"><span class="check"></span><?php echo $cat->name ?></a></li>
						<?php endforeach; ?>
					</ul> <!-- /.cat-filter.new-media -->
				</div> <!-- .span2 -->
			</div> <!-- /.row -->
			<div class="pull-right">
				<a class="btn btn-inverse" id="filter-btn" href="javascript:void(0)">Filter</a>
			</div>
		</div> <!-- /#cat-filters -->
		<?php endif; ?>