
    $(document).ready(function(){

        set_btn_clickable();
        school_select(); // 按地域选择学校

        resetpage();
        $('#slt_job_type').on('change',function(){
            resetpage();
        });

        function resetpage(){
            $('#student_info').removeClass('hidden').addClass('hidden');
            $('#worker_info').removeClass('hidden').addClass('hidden');
            $('#other_info').removeClass('hidden').addClass('hidden');
            $('#boss_info').removeClass('hidden').addClass('hidden');

            var job_type = $('#slt_job_type').val();
            if(job_type == 1){
                $('#btn_submit').prop('disabled', false);
            }
            if (job_type == 2) {
                $('#worker_info').removeClass('hidden');
            } else if (job_type == 3) {
                $('#other_info').removeClass('hidden');
            } else if (job_type == 4) {
                $('#boss_info').removeClass('hidden');
            } else if (job_type == 5) {
                $('#wait_work').removeClass('hidden');
            } else if (job_type == 6) {
                $('#retire').removeClass('hidden');
            }
        }
       var a= document.querySelectorAll('*[required=required]');
        $('#btn_submit').on('click',function(){
            var dom = null;
            var job_type = $('#slt_job_type').val();

            if (job_type == 1) {
                dom = $('#student_form');

            } else if (job_type == 2) {
                dom = $('#worker_form');

                if ($('#slt_com_industry').val() == '') {
                    $.alert('请选择所属行业');
                    return;
                }
                                if ($.trim($('#ipt_com_name').val()) == '') {
                    $.alert('单位名称不能为空');
                    return;
                }

                if ($('#com_entry_year').val() == '' || $('#com_entry_month').val() == '' ) {
                    $.alert('请选择入职时间');
                    return;
                }
                var income = $.trim($('#ipt_income').val());
                if (income.length == 0) {
                    $.alert('税后月收入不能为空');
                    return;
                }
                if (income <= 0) {
                    $.alert('税后月收入必须大于0');
                    return;
                }

            }else if(4 == job_type) {
                dom = $('#boss_form');

                if ($('#boss_com_industry').val() == '') {
                    $.alert('请选择所属行业');
                    return;
                }
                if ($.trim($('#boss_com_name').val()) == '') {
                    $.alert('单位名称不能为空');
                    return;
                }

                if($('#register_addr').val() == '') {
                    $.alert('请输入注册地址');
                    return;
                }

                if ($('#boss_com_entry_year').val() == '' || $('#boss_com_entry_month').val() == '' ) {
                    $.alert('请选择成立时间');
                    return;
                }
                var income = $.trim($('#boss_income').val());
                if (income.length == 0) {
                    $.alert('税后月收入不能为空');
                    return;
                }

                if (income <= 0) {
                    $.alert('税后月收入必须大于0');
                    return;
                }
            } else if (job_type == 3) {
                dom = $('#other_form');

                if ($.trim($('#ipt_income_source').val()) == '') {
                    $.alert('收入来源不能为空');
                    return;
                }
            } else if (job_type == 5) {
                dom = $('#wait_form');
            } else if (job_type == 6) {
                dom = $('#retire_form');
            }
            if (dom) {
                brd_ajax({
                    url: '/Qianbao/Addinfos/updateJobInfo',
                    data: dom.serialize(),
                    success: function(opts, response) {
                            if (response.data.redirect_url) {
                                location.href = response.data.redirect_url;
                            }else{
                                location.href = "/Qianbao/Profile/index.html";
                            }
                    },
                    error:function(opts,response){
                        $.alert(response.result.msg);
                    }
                });
            } else {
                $.alert('请选择就业状况');
            }
        });
    });
